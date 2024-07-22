'use client';

import React from 'react';
import styled from 'styled-components';
import LoginForm from '@/components/users/organisms/LoginForm';


const Login = () => {
    return (
        <LoginWrapper>
            <Title>LOG IN</Title>
            <LoginForm />
        </LoginWrapper>
    );
};

export default Login;

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f8f9fa;
    // padding: 0px 100px;
`;

const Title = styled.h1`
    
`;