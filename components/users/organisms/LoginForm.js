'use client';
import React from 'react';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation';
import { login } from '../../../api/user';
import { setAuthToken } from '@/lib/utils/user';
import { authService } from '@/lib/firebase';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';

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
            console.log(data);
            setAuthToken(data.user.accessToken);
            console.log('로그인 성공')
            toast.success('로그인 성공');
            // navigate('/mainprofile');//TODO: (로그인) 성공 시 navigate to something 페이지
            router.push('/mainprofile');//TODO: (로그인) 성공 시 navigate to something 페이지
        } catch(error) {
            let errorMessage = '로그인에 실패했습니다.';
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = '이메일 혹은 비밀번호가 잘못되었습니다.';
                    break;
                case 'auth/user-disabled':
                    errorMessage = '사용이 중지된 계정입니다.';
                    break;
                case 'auth/user-not-found':
                    errorMessage = '해당 이메일로 가입된 사용자를 찾을 수 없습니다.';
                    break;
                case 'auth/invalid-credential':
                    errorMessage = '이메일 혹은 비밀번호가 잘못되었습니다.';
                    break;
                default:
                    errorMessage = '알 수 없는 오류가 발생했습니다.';
            }
            toast.error(errorMessage);
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
            </Form>
            <ToastContainer />
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
    width: 80vh;
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
