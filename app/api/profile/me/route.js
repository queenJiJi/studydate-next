// 내 프로필 가져오기 용 api 

import { sql } from "@vercel/postgres";
import admin from '@/lib/firebaseAdmin'

export async function GET(request) {
    // 내 프로필이 있는지 알려면 로그인이 되어있어야하니까 토큰체크
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ message: 'No token provided' }, {status: 401});
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const uid = decodedToken.uid;
        
      const data = await sql`SELECT * FROM "Profile"
        JOIN "User" ON "Profile".user_id = "User".id
        WHERE "User".firebase_id = ${uid}
      `
        if(data.rows.length === 0){ // 만약 데이터가 없으면 = 프로필을 아직 만들지 않았다는 것
            return Response.json({status:'error', error: 'No profile found'}, {status: 404}) // 404: 해당 리소스가 없음
        }
        
        return Response.json(data.rows[0]); // 데이터가 있으면 하나만 있을 테니까 첫번째꺼 가져오기

    } catch (error) {
        console.error(error)
        return Response.json({status:'error', error})
    }
}