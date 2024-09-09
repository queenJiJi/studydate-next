// instance토대로 login관련된 내용(id,pw)을 서버로 보내고 응답을 받는 파일
import apiClient from './base'; // base.js에서 instance로 받아온 것임. 즉, apiClient = instance
import { webHookURL } from '@/lib/slack';

/**
 * 
 * @param {*} id 
 * @param {*} pw 
 * @returns token if success
 */
// 이건 content-type을 application/json 타입으로 요청 날릴때 쓰는 것임!
export const login = async(id,pw) => {
    // id,pw가 맞는지 확인해야하니까 post로 보내주고 '/login'은 baseURL뒤에 붙는 url, 데이터는 객체형태로 {서버에서 정한 키워드: 내가 보내는 데이터}
    const response = await apiClient.post('/login',{
        id: id,
        password: pw
    })
    // if success, response body에서 {'token' : 'FD(#JSFDSD)} -> 성공했다면 jwt토큰을 발급해줌
    return response.data // 서버 요청에 대한 결과값을 return
}

export const signup = async(email,firebase_id) => {
    const response = await apiClient.post('/api/signup',{ // formData 객체형성해서 formdata에 넣어주고 보내줬다면, 여기서는 그냥 바로 객체로 보내줘도 됨
        email: email, // email(키) 를 가진: 위에서 받은(email 값) 전송 
        firebase_id: firebase_id
    })

    return response.data //성공적으로 BE에 요청보냈다면, reponse: 'ok'를 돌려받을것이고, 그 정보가 저장된게 response.data
}

export const sendSlack = async(message) => {
    const response = await apiClient.post('/api/slack',{
        message: message
    })

    return response.data
};
// export const connectingSlack = async(message) => {
//     try {
//         // const webhookurl = `https://cors-anywhere.herokuapp.com/${process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL}`
//         // const webhookUrl = "https://cors-anywhere.herokuapp.com/"+webHookURL;
//         const response = await apiClient.post(webHookURL, {
//             text: `New login: ${message} just logged in!`
//         });
//         if (response.status === 200) {
//             console.log('Slack notification sent successfully');
//         } else {
//             console.log('Failed to send Slack notification:', response.status);
//         }
//     } catch (error) {
//         console.error('Error sending Slack notification:', error);
//     }
// };