import apiClient from './base'; // base.js에서 instance로 받아온 것임. 즉, apiClient =instance

// Profile은 user와 다르게 이미지를 다루기 때문에 json 타입으로 요청을 날리면 안되고, multipart/form-data 타입으로 해줘야함
export const createProfile = async(data) => {
    const formData = new FormData(); // 새로운 객체 형성

    formData.append('user_id',1);  // TODO: 나중에 실제 요청 유저 아이디로 바꾸기
    formData.append('dream', data.dream);
    formData.append('introduction', data.intro);
    formData.append('grade', data.grade);
    formData.append('major', data.subjects);
    formData.append('concern', data.concerns);
    formData.append('ideal_type', data.idealType);
    formData.append('img', '/img/img.png');
    formData.append('name', data.name);

    const response = await apiClient.post('/api/profile',formData, 
        { headers: {
            'Content-Type': 'multipart/form-data'
        }})
    return response.data
}