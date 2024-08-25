import apiClient from './base'; // base.js에서 instance로 받아온 것임. 즉, apiClient =instance
import { recursiveToCamel } from '@/lib/utils/object';

// Profile은 user와 다르게 이미지를 다루기 때문에 json 타입으로 요청을 날리면 안되고, multipart/form-data 타입으로 해줘야함
export const createProfile = async(data) => {
    const formData = new FormData(); // 새로운 객체 형성

    // formData.append('user_id',1);  
    formData.append('dream', data.dream);
    formData.append('introduction', data.intro);
    formData.append('grade', data.grade);
    formData.append('major', data.subjects);
    formData.append('concern', data.concerns);
    formData.append('ideal_type', data.idealType);
    formData.append('img', data.image);
    formData.append('name', data.name);

    const response = await apiClient.post('/api/profile',formData, 
        { headers: {
            'Content-Type': 'multipart/form-data'
        }})
    return response.data
}

export const readProfile = async () => {
    const response = await apiClient.get('/api/profile');
    // ideal_type 때문에 '_'를 제외하려고 형맞춰주기위해 짠 recursiveToCamel함수 써주기
    return recursiveToCamel(response.data)

}
export const readMyProfile = async () => {
    const response = await apiClient.get('/api/profile/me');
    // ideal_type 때문에 '_'를 제외하려고 형맞춰주기위해 짠 recursiveToCamel함수 써주기
    return recursiveToCamel(response.data)
}