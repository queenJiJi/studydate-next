'use client';

import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useAuth } from '@/store/authStore';
import { getAuthToken } from '@/lib/utils/user';

// 새로고침했을 때 전역상태와 로컬스토리지 값과 sync가 맞아야하기 때문에
// ex. 로그인했던걸 기억해야하니까 새로고침할때마다 

const AuthLayout = ({children}) => {
    const updateToLogin = useAuth((state)=>state.updateToLogin)
    useEffect(()=>{
        const token = getAuthToken()
        if(token) {
            const {email,user_id} = jwtDecode(token); // token을 decode를 해줘서, token내에 포함되어있던 email,user_id 가져오기
            updateToLogin({email:email,firebaseId:user_id}); // 상태업데이트
        }
    }, []);

    return children
}

export default AuthLayout;