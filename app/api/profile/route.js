import { sql } from "@vercel/postgres";
import admin from "@/lib/firebaseAdmin";
import path from "path";
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

// 이미지 업로드르 위한 코드
// Helper function to save the uploaded file in the public/uploads directory with a UUID name
async function saveFile(file) {
    const uploadDir = path.join(process.cwd(), 'public', 'images');
    
    // Ensure the directory exists - uploadDir라는 폴더가 없으면 directory 생성
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate a unique file name using UUID and preserve the file extension -- UUID 알고리즘(파일명이 절대 겹치지 않게함)
    const fileExtension = path.extname(file.name);
    const uuidFileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(uploadDir, uuidFileName);
    
    // Read the file data
    const fileData = Buffer.from(await file.arrayBuffer());
    
    // Write the file to the upload directory - 파일 저장
    await fs.writeFile(filePath, fileData);
    
    return `/images/${uuidFileName}`; // DB에 넣어주기위한 경로
}

export async function POST(request) {
    // 토큰을 추출해서 verify & decode - 로그인이 된 경우에만 profile을 생성할 수 있어야하니까
    
    // 토큰 추출
    const authHeader = request.headers.get('Authorization'); // 토큰을 헤더에 넣어서 'Authorization'이라는 키를 통해서 보냈었으니까(base.js에서)

    if (!authHeader || !authHeader.startsWith('Bearer ')) { // 만약에 헤더에 들어잇던 토큰 값이 없거나, 'Bearer'로 시작하지 않는다면
        return Response.json({ message: 'No token provided' }, {status: 401}); // 바로 토큰이 없다고 response (401에러코드 전송)
    }

    const token = authHeader.split(' ')[1];// 여기까지 왔으면 토큰이 있으니까, 공백을 기준으로 나눠주면, 'Bearer 토큰값'로 되어있으니 [0]은 Bearer, [1]이 진짜 토큰값 
  
    try {
        // 추출한 토큰을 verify & decode 
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid; // 토큰을 가진 user의 firebase_id

        const users = await sql`SELECT * FROM "User" WHERE firebase_id=${uid}`; // User의 firebase_id가 있어야, profile 테이블의 user_id 컬럼 값을 넣어줄 수 있으니까 firebase_id 추출하기
        const user = users.rows[0];

        const form = await request.formData(); //이렇게 해서 유저가 보낸 데이터를 뽑아줌 (그래야 db에 넣어주니까)
        // console.log(form.get('test'))

        const img = form.get('img');
        const imgPath = await saveFile(img);
    
        const result = await sql`INSERT INTO "Profile"
        (user_id, dream, introduction, grade, major, concern, ideal_type, img, name)
        VALUES (
            ${user.id},
            ${form.get('dream')},
            ${form.get('introduction')},
            ${form.get('grade')},
            ${form.get('major')},
            ${form.get('concern')},
            ${form.get('ideal_type')},
            ${imgPath},
            ${form.get('name')}
        )`
        // console.log(result)
        return Response.json({status:'ok'});
    } catch(e) {
        console.log(e)
        return Response.json({status:'error'}, {status: 400});
    }

}

export async function GET() {
    const data = await sql`SELECT * FROM "Profile"`
    console.log(data)
    
    return Response.json(data.rows); 
}