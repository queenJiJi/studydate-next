'use client';

import React from 'react';
import styled from 'styled-components';
import ProfileForm from '@/components/createprofile/organisms/ProfileForm';

const page = () => {
    return (
        <FormContainer>
            <ProfileForm />
        </FormContainer>
    );
};

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 20px;
`;


export default page;

