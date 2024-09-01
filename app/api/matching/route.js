import {sql} from '@vercel/postgres';
import admin from '@/lib/firebaseAdmin'

// 나와 관련된 모든 매칭을 읽을 수 있게 하는 API - Read
export async function GET(request) {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ message: 'No token provided' }, {status: 401});
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const uid = decodedToken.uid;

        const users = await sql`
        SELECT 
        -- Matching Table Fields
        "Matching".id AS id,
        "Matching".sender AS sender_id,
        "Matching".receiver AS receiver_id,
        "Matching".created_at AS created_at,
        "Matching".updated_at AS updated_at,
        "Matching".status AS status,

        -- Sender User Table Fields
        sender.id AS sender_user_id,
        sender.email AS sender_email,
        sender.firebase_id AS sender_firebase_id,

        -- Sender Profile Table Fields
        sender_profile.id AS sender_profile_id,
        sender_profile.user_id AS sender_profile_user_id,
        sender_profile.dream AS sender_profile_dream,
        sender_profile.introduction AS sender_profile_introduction,
        sender_profile.grade AS sender_profile_grade,
        sender_profile.major AS sender_profile_major,
        sender_profile.concern AS sender_profile_concern,
        sender_profile.ideal_type AS sender_profile_ideal_type,
        sender_profile.img AS sender_profile_img,
        sender_profile.name AS sender_profile_name,

        -- Receiver User Table Fields
        receiver.id AS receiver_user_id,
        receiver.email AS receiver_email,
        receiver.firebase_id AS receiver_firebase_id,

        -- Receiver Profile Table Fields
        receiver_profile.id AS receiver_profile_id,
        receiver_profile.user_id AS receiver_profile_user_id,
        receiver_profile.dream AS receiver_profile_dream,
        receiver_profile.introduction AS receiver_profile_introduction,
        receiver_profile.grade AS receiver_profile_grade,
        receiver_profile.major AS receiver_profile_major,
        receiver_profile.concern AS receiver_profile_concern,
        receiver_profile.ideal_type AS receiver_profile_ideal_type,
        receiver_profile.img AS receiver_profile_img,
        receiver_profile.name AS receiver_profile_name

        FROM "Matching"
        JOIN "User" AS sender ON "Matching".sender = sender.id
        JOIN "Profile" AS sender_profile ON sender_profile.user_id = sender.id
        JOIN "User" AS receiver ON "Matching".receiver = receiver.id
        JOIN "Profile" AS receiver_profile ON receiver_profile.user_id = receiver.id
        WHERE sender.firebase_id = ${uid} OR receiver.firebase_id = ${uid}
        `
        
        return Response.json(users.rows); 
    } catch (error) {
        console.error(error)
        return Response.json({status:'error', error})
    }
}

// 매칭을 하나 추가(매칭 요청을 보냄)하는 = 매칭을 할 수 있게 하는 API - Write
export async function POST(request) {

    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ message: 'No token provided' }, {status: 401});
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const uid = decodedToken.uid;

      const users = await sql`SELECT * FROM "User" WHERE firebase_id = ${uid}`;
        const user = users.rows[0];

        // 프론트에서 보내준 프로필 아이디를 뽑아내야함. 즉, 프론트측에서 내가 sayhi를 했다면 그 sayhi한 userid를 뽑는 것 = 프론트가 보낸 내가 요청을 보낸 사람 id
        const { receiver } = await request.json(); 

        await sql`INSERT INTO "Matching" (status, created_at, updated_at, sender, receiver) VALUES (
            'pending',
            ${new Date()},
            ${new Date()},
            ${user.id},
            ${receiver}
        )`;

        return Response.json({status:'ok'});
    } catch (error) {
        console.error(error);
        return Response.json({status:'error', error})
    }
}