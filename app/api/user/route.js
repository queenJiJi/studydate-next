import {sql} from '@vercel/postgres';

// 참고로 쿼리문을 동작시켜주는 'sql'이라는 함수가 비동기식으로 동작 (async - await 해줘야함)
export async function GET() {
    // DONE: 어떤 table에서 어떤 column을 가져올지 sql 작성
    const users = await sql`SELECT * FROM "User"`
    console.log(users)
    
    return Response.json(users.rows); 
}

