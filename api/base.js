// axios config 미리 정의해서 instance화 시킬 파일
import axios from 'axios'; // axios: 백엔드에 요청보낼때 쓰는 것

const instance = axios.create({ // axios 객체로서 baseURL 도메인으로 요청을 보내는 것
    baseURL: 'http://localhost:3000',
    headers:{
        'Content-Type': 'application/json', // 요청을 날릴때 서버한테 응답데이터를 '어떤 구조의 응답을 줘'라고 명시하는 것
    }
});

export default instance;