import {sql} from '@vercel/postgres';
import admin from '@/lib/firebaseAdmin';

// body = {
//     type: 'accept' | ' decline' | 'cancel'
// } -- 프론트에서 이런 형태로 버튼이 어떤 버튼인지 보낼 것임

// matching을 위해선 matchingID가 필요함 - 그걸 url 내에 쿼리문에서 가져올 것임 
// {params: {matchingId}} 는 2번 비구조화할당한 것임
// 원랜 POST(request)만 하는데, 여기선 matchingID가 필요해서 가져온것
export async function POST(request, {params: {matchingId}}) { 
    const {type} = await request.json(); // 프론트에서 json형태로 보내니 백에서 받을때도 json 형태로
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ message: 'No token provided' }, {status: 401});
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const uid = decodedToken.uid;

      if(type=='accept') { // 버튼이 'accept' 버튼일때
        await sql`
        UPDATE "Matching"
        SET status = 'accepted'
        WHERE id = ${matchingId};
        `
      } else if(type == 'decline') {
        await sql`
        UPDATE "Matching"
        SET status = 'rejected'
        WHERE id = ${matchingId};
        `
      } else if(type=='cancel') {
        await sql`
        UPDATE "Matching"
        SET status = 'cancelled'
        WHERE id = ${matchingId}
        `
      } else { // 프론트에서 요청을 잘못 보냈을 때 - 에러 전송
        return Response.json({status:'error', error: 'Invalid type'});
      }

       
      return Response.json({status:'success'}); 
    } catch (error) {
        console.error(error)
        return Response.json({status:'error', error})
    }
}
