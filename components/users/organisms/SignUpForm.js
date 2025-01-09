'use client';
import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import { authService } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setAuthToken } from '@/lib/utils/user';
import { signup } from '@/api/user';
import Swal from 'sweetalert2';

// 유효성 검사 스키마 정의
const schema = yup.object().shape({
    username: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const SignUpForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const router = useRouter();

    const onSubmit = async (formData) => {
        try {
            const data = await createUserWithEmailAndPassword(authService, formData.email, formData.password);
            console.log(data);

            // 회원 정보를 데이터베이스에 저장
            await signup(formData.email, data.user.uid);

            // 토큰 저장
            setAuthToken(data.user.accessToken);

            // 성공 알림 표시
            await Swal.fire({
                icon: 'success',
                title: 'Sign-Up Successful!',
                text: `Welcome, ${formData.username}!`,
                confirmButtonText: 'OK',
            });

            // 메인 페이지로 이동
            router.push('/mainprofile');
        } catch (error) {
            let errorMessage = 'Something went wrong. Please try again.';
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'The email address is already in use.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'The email address is not valid.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'The password is too weak.';
                    break;
                default:
                    errorMessage = 'An unknown error occurred.';
            }

            // 실패 알림 표시
            Swal.fire({
                icon: 'error',
                title: 'Sign-Up Failed',
                text: errorMessage,
                confirmButtonText: 'OK',
            });

            console.error('Error signing up:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormField
                label="Name"
                type="text"
                {...register('username')}
                error={errors.username}
            />
            <FormField
                label="Email"
                type="email"
                {...register('email')}
                error={errors.email}
            />
            <FormField
                label="Password"
                type="password"
                {...register('password')}
                error={errors.password}
            />
            <Button type="submit">SIGN UP</Button>
        </Form>
    );
};

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

export default SignUpForm;
// 'use client';
// import React,{useState} from 'react';
// import styled from 'styled-components';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// // import { useNavigate } from 'react-router-dom';
// import { useRouter } from 'next/navigation';
// import FormField from '../molecules/FormField';
// import Button from '../atoms/Button';
// import { authService } from '@/lib/firebase';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { setAuthToken } from '@/lib//utils/user';
// import { signup } from '@/api/user';

// // 유효성 검사 스키마 정의
// const schema = yup.object().shape({
//     username: yup.string().required('Name is required'),
//     email: yup.string().email('Invalid email address').required('Email is required'),
//     password: yup.string().min(6, 'Invalid password').required('Password is required'),
// });

// const SignUpForm = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm({
//         resolver: yupResolver(schema)
//     });

//     const router = useRouter();
//     /**
//      * register가 Input에 대한 onchange와 value를 컨트롤링해주기때문에 아래는 불필요해짐 
//      */
//     // const [formData, setFormData] = useState({
//     //     username:'',
//     //     email:'',
//     //     password:'',
//     // });

//     // const handleChange =(e) =>{
//     //     const {name,value} = e.target;
//     //     // console.log(e.target)
//     //     // console.log('hi',...formData);
//     //     // console.log(name, value)
//     //     setFormData({
//     //         ...formData,
//     //         [name]:value,
//     //     });
//     // };

//     const onSubmit = async(formData) => {
//         // e.preventDefault();
//         console.log(formData);
//         try {
//             const data = await createUserWithEmailAndPassword(authService,formData.email, formData.password);
//             console.log(data);
//             // const requestBody = {
//             //     id: data.user.uid
//             // }// TODO: (회원가입) 성공시 data(회원가입된 user 정보)정보를 우리 데이터베이스(서버)에 저장 
//             await signup(formData.email, data.user.uid); //email, firebase_id
//             setAuthToken(data.user.accessToken);
//             router.push('/mainprofile');//TODO: (회원가입) 성공 시 navigate to main page
//         } catch(error) {
//             // console.log('something went wrong with google auth');
//             // console.log(error);
//             console.error('Error signing up', error);
//         }
//     };

//     return (
//         <Form onSubmit = {handleSubmit(onSubmit)}>
//             <FormField 
//                 label='Name'
//                 type='text'
//                 // placeholder='이름을 입력하세요'
//                 {...register('username')}
//                 error={errors.username}
//                 // value ={formData.username}
//                 // onChange={handleChange}
//                 // name='username'
//             />
//             <FormField 
//                 label='Email'
//                 type='email'
//                 // placeholder='이메일을 입력하세요'
//                 {...register('email')}
//                 error={errors.email}
//                 // value ={formData.email}
//                 // onChange={handleChange}
//                 // name='email'
//             />
//             <FormField 
//                 label='Password'
//                 type='password'
//                 // placeholder='비밀번호를 입력하세요'
//                 {...register('password')}
//                 error={errors.password}
//                 // value ={formData.password}
//                 // onChange={handleChange}
//                 // name='password'
//             />
//             <Button type='submit'>SIGN UP</Button>
//         </Form>
//     );
// };

// // const Form = styled.form`
// //     max-width: 400px;
// //     margin: 0 auto;
// //     padding: 20px;
// //     border: 1px solid #ccc;
// //     border-radius: 8px;
// // `;


// const Form = styled.form`
//     width: 80vh;
//     padding: 20px;
//     border: 1px solid #ccc;
//     border-radius: 8px;
//     background-color: #fff;
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
// `;


// export default SignUpForm;