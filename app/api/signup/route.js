// DB의 User 테이블에 정보를 넣어줄 것임 
    // 요청 데이터로 email, firebase_id를 받아야함
// Content-Type: application/json (img가 없으니까)
import { sql } from "@vercel/postgres";
export async function POST(request){ // FE에서 insert(=post)일테니까 BE에서 이렇게 받아주기
    const data = await request.json();  // FE로 부터 데이터를 받기
    // data.email; // data.get()이 아니라 json은 바로 객체가 넘어오기때문에 바로 접근 가능
    // data.firebase_id;

    // DB에 넣어주기
    await sql `INSERT INTO "User" (email, firebase_id) VALUES ( 
        ${data.email},
        ${data.firebase_id}
    )`;
    // 잘넣어줬다면 성공 response띄우기
    return Response.json({status:' ok'});
}