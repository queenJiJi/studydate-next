import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
export const useAuth = create(devtools((set)=> ({
    isLogin: false,
    email: null,
    firebaseId: null,    
    updateToLogin: ({email,firebaseId}) => set({
        isLogin: true,
        email: email,
        firebaseId: firebaseId
    }),
    updateToLogout: () => set({
        isLogin: false,
        email: null,
        firebaseId: null
    })
})));