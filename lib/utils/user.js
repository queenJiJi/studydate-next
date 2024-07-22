// 로컬스토리지 사용
const TOKEN_KEY = 'TOKEN';
export const getAuthToken = () => {
}

export const setAuthToken = (token) =>{
    localStorage.setItem(TOKEN_KEY, token);
}