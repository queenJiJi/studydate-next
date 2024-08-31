// 로컬스토리지 사용
const TOKEN_KEY = 'TOKEN';
export const getAuthToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

export const setAuthToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const clearAuthToken = () => {
    localStorage.clear();
}