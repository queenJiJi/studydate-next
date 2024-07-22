'use client';

import React from 'react';
import styled from 'styled-components';
import SignUpForm from '@/components/users/organisms/SignUpForm';

const SignUp = () => {
    return (
        <SignUpWrapper>
            <Title> SIGN UP </Title>
            <SignUpForm />
        </SignUpWrapper>
    );
};

const SignUpWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f8f9fa;
`;

const Title = styled.h1`
    
`;

export default SignUp;