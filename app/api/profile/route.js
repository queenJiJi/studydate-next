import { sql } from "@vercel/postgres";

export async function POST(request) {
    const form = await request.formData() //이렇게 해서 유저가 보낸 데이터를 뽑아줌 (그래야 db에 넣어주니까)
    console.log(form.get('test'))

    const result = await sql`INSERT INTO "Profile"
    (user_id, dream, introduction, grade, major, concern, ideal_type, img, name)
    VALUES (
        ${form.get('user_id')},
        ${form.get('dream')},
        ${form.get('introduction')},
        ${form.get('grade')},
        ${form.get('major')},
        ${form.get('concern')},
        ${form.get('ideal_type')},
        ${form.get('img')},
        ${form.get('name')}
    )`
    console.log(result)
    return Response.json({status:'ok'})
}

export async function GET() {
    const data = await sql`SELECT * FROM "Profile"`
    console.log(data)
    
    return Response.json(data.rows); 
}