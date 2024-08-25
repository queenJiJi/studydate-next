'use client';

import React, { useState, useEffect } from 'react';
import styled, {keyframes, css} from 'styled-components';
import Button from '../atoms/Button';
import ProfileCard from '@/components/profile/organisms/ProfileCard';
import { useRouter } from 'next/navigation';
import { createProfile } from '@/api/profile';
import { useMutation } from '@tanstack/react-query';

const StepFinal = ({prevStep, imagePreview, handleChange, data}) => {
    const router = useRouter();

    // react-query 적용
    const {mutate, isPending, isError} = useMutation({
        mutationFn: createProfile,
        onSuccess: () => { // createProfile에 성공했을 시
            router.push('/mainprofile');
        },
        onError: (error) => { // createProfile에 실패했을 시
            console.error('failed to create profile:',error);
        }
    })


    const profileCompleted = async () => {
        mutate(data)
        // try {
        //     // Send the data to create a profile
        //     await createProfile(data);
            
        //     // On success, navigate to the main profile page
        //     router.push('/mainprofile');
        // } catch (error) {
        //     console.error('Failed to create profile:', error);
        //     // Handle the error (e.g., show a notification to the user)
        // }
    }

    return (
        <Wrapper>
            <Title>👻 MY PROFILE 👻</Title>
    
            {/* <AnimatedProfileCard data={data} animate={animate}/> */}
            <ProfileCard data={
                {...data,
                introduction: data.intro,
                major: data.subjects,
                concern: data.concerns,
                img: imagePreview}
                } />

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

