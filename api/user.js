// instance토대로 login관련된 내용(id,pw)을 서버로 보내고 응답을 받는 파일
import apiClient from './base'; // base.js에서 instance로 받아온 것임. 즉, apiClient = instance

/**
 * 
 * @param {*} id 
 * @param {*} pw 
 * @returns token if success
 */
export const login = async(id,pw) => {
    // id,pw가 맞는지 확인해야하니까 post로 보내주고 '/login'은 baseURL뒤에 붙는 url, 데이터는 객체형태로 {서버에서 정한 키워드: 내가 보내는 데이터}
    const response = await apiClient.post('/login',{
        id: id,
        password: pw
    })
    // if success, response body에서 {'token' : 'FD(#JSFDSD)} -> 성공했다면 jwt토큰을 발급해줌
    return response.data // 서버 요청에 대한 결과값을 return
}