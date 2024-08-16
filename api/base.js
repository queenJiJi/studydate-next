// axios config 미리 정의해서 instance화 시킬 파일
import { getAuthToken } from '@/lib/utils/user';
import axios from 'axios'; // axios: 백엔드에 요청보낼때 쓰는 것

const instance = axios.create({ // axios 객체로서 baseURL 도메인으로 요청을 보내는 것
    baseURL: 'http://localhost:3000',
    headers:{
        'Content-Type': 'application/json', // 요청을 날릴때 서버한테 응답데이터를 '어떤 구조의 응답을 줘'라고 명시하는 것
    }
});

// Add a token to the header - Interceptor
instance.interceptors.request.use( // 요청에 대한 intercept 로직을 추가 
    (config) => {
        const token = getAuthToken(); // 토큰을 받아서 
        if(token) { // token이 null이 아니라면 = token에 값이 있다면 = user가 login을 한 상태라면
            config.headers.Authorization = `Bearer ${token}` // 헤더에 포함시켜서 interceptors에 보내주기
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;