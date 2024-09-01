'use client';
import React from 'react';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '../../../api/user';
import { setAuthToken } from '@/lib/utils/user';
import { authService } from '@/lib/firebase';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import { useAuth } from '@/store/authStore';

import Swal from 'sweetalert2';


const schema = yup.object().shape({
    id: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(6,'Invalid password').required(),
  });

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // const navigate = useNavigate();
    const router = useRouter();
    const updateToLogin = useAuth((state)=> state.updateToLogin);

    const onSubmit = async(formData) =>{
        // console.log(formData);
        // e.preventDefault();
        // const [id,pw] = e.target;
        // const token = await login(id,pw); // login함수가 비동기 함수이므로 받는것도 비동기식으로 async-await로 받아야함
        // console.log(e.target[0].value);
        // console.log(e.target[1].value);
        // 토큰을 글로벌로 저장하거나 아래처럼 로컬스토리지에 저장할수도 있는데 
            // 글로벌로 저장하면 창을 닫으면 토큰값이 날아가니까 
            // 일반적으로 창을 닫으면 안날아가게 로컬스토리지에 토큰값을 저장해둠
        // localStorage.setItem("TOKEN", token);
        // setAuthToken()

        try {
            await setPersistence(authService, browserLocalPersistence);
            const data = await signInWithEmailAndPassword(authService,formData.id, formData.password);
            
            setAuthToken(data.user.accessToken);
       
            await Swal.fire({
                icon: "success",
                title: "You're Logged In!",
              })
            updateToLogin({email:data.user.email, firebaseId: data.user.uid}); // 로그인 상태 변경
            router.push('/mainprofile');
        } catch(error) {
            let errorMessage = 'Login failed.';
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = 'The email or password is incorrect.';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'This account has been disabled.';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'No user found with this email address.';
                    break;
                case 'auth/invalid-credential':
                    errorMessage = 'The email or password is incorrect.';
                    break;
                default:
                    errorMessage = 'An unknown error occurred.';
            }

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            });

            console.error('Error signing in', error);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    label='EMAIL'
                    type='id'
                    // placeholder='아이디를 입력하세요'
                    {...register('id')}
                    error={errors.id}
                    // <input type='text' name='id' required/>
                />
                <FormField
                    label='PASSWORD'
                    type='password'
                    // placeholder='비밀번호를 입력하세요'
                    {...register('password')}
                    error={errors.password}
                    // <input type='password' name='pw' required
                />
                <Button type='submit'>LOG IN</Button>
                <NavContainer>
                    <NavSignUp href="/signup">
                        <SignupText>Sign Up</SignupText>
                    </NavSignUp>
                </NavContainer>
            </Form>
            {/* <ToastContainer /> */}
        </>
    );
};

export default LoginForm;

// const Form = styled.form`
//     max-width: 400px;
//     margin: 0 auto;
//     padding: 20px;
//     border: 1px solid #ccc;
//     border-radius: 8px;
// `;

const Form = styled.form`
    width: 80vh; // TODO: 반응형
    // width: 100%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const NavContainer = styled.div`
    width: 100%;
    padding: 5px 20px;
    display: flex;
    justify-content: right;
`;

const NavSignUp = styled(Link)`
    text-decoration: none;
`;

const SignupText = styled.div`
    color: red;
    opacity: 50%;
    text-decoration: none;

    &:hover {
        opacity: 100%;
        text-decoration: underline;
    }
`
