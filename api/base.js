// axios config 미리 정의해서 instance화 시킬 파일
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.server.com',
    headers:{
        'Content-Type': 'application/json', // 요청을 날릴때 서버한테 응답데이터를 '어떤 구조의 응답을 줘'라고 명시하는 것
    }
});

export default instance;