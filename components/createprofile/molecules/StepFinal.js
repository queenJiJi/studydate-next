'use client';

import React, { useState, useEffect } from 'react';
import styled, {keyframes, css} from 'styled-components';
import Button from '../atoms/Button';
import ProfileCard from '@/components/profile/organisms/ProfileCard';
import { useRouter } from 'next/navigation';

// const spin = keyframes`
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(1080deg); } // 360 * 3 = 1080
// `;

// const AnimatedProfileCard = styled(ProfileCard)`
//     ${({ animate }) =>
//         animate &&
//         css`
//             animation: ${spin} 2s ease-in-out;
//     `}
// `;

const StepFinal = ({prevStep, handleChange, data}) => {
    const router = useRouter();
    
    // const [animate, setAnimate] = useState(true);
    // useEffect(() => {
    //     setAnimate(true);
    //     console.log(animate)
    // }, []);

    return (
        <Wrapper>
            <Title>👻 MY PROFILE 👻</Title>
    
            {/* <AnimatedProfileCard data={data} animate={animate}/> */}
            <ProfileCard data={data} />

            <ButtonContainer>
                <Button onClick={prevStep}>EDIT</Button>
                <Button onClick={()=>router.push('/mainprofile')}>EXPLORE FRIENDS</Button>
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

