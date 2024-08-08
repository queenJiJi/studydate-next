'use client';

import React, { useState, useEffect } from 'react';
import styled, {keyframes, css} from 'styled-components';
import Button from '../atoms/Button';
import ProfileCard from '@/components/profile/organisms/ProfileCard';
import { useRouter } from 'next/navigation';
import { createProfile } from '@/api/profile';

const StepFinal = ({prevStep, handleChange, data}) => {
    const router = useRouter();

    const profileCompleted = async () => {
        try {
            // Send the data to create a profile
            await createProfile(data);
            
            // On success, navigate to the main profile page
            router.push('/mainprofile');
        } catch (error) {
            console.error('Failed to create profile:', error);
            // Handle the error (e.g., show a notification to the user)
        }
    }

    return (
        <Wrapper>
            <Title>👻 MY PROFILE 👻</Title>
    
            {/* <AnimatedProfileCard data={data} animate={animate}/> */}
            <ProfileCard data={data} />

            <ButtonContainer>
                <Button onClick={prevStep}>EDIT</Button>
                <Button onClick={profileCompleted}>EXPLORE FRIENDS</Button>
            </ButtonContainer>
        </Wrapper>
    );
};

const Wrapper = styled.div`
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: 800;
    text-align: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`

export default StepFinal;

