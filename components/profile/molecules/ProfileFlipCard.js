'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
import LeftIcon from '@/assets/left_arrow.svg';
import RightIcon from '@/assets/right_arrow.svg';
import Swal from 'sweetalert2';
import { createMatching } from '@/api/matching';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/store/authStore';
import { useRouter } from 'next/navigation';

const ProfileFlipCard = ({front, back, userId}) => {
    const [isFlip, setIsFlip] = useState(false);
    const isLogged = useAuth((state)=> state.isLogin);
    const router = useRouter();
    const queryClient = useQueryClient();   

    const sayHiHander = async()=>{
        if(isLogged) {
            await createMatching({receiver: userId}); // 매칭 신청
            await queryClient.invalidateQueries({
                queryKey: ['matching']
            }); // 강제로 재랜더링 실행
            await Swal.fire({
                icon: "success",
                title: "Good Job!",
                text: "You'll hear from your friend soon!"
                })}
        else { // 로그인이 되어있지 않은 상태일때
            await Swal.fire({
                icon: 'warning',
                title: 'Hi👋',
                text: 'Please Log in or Sign up First!',

            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/login');}
            })
        }
    }
    return (
        <CardContainer>
            <ButtonContainer>
                <ArrowButton 
                    type='button'
                    onClick={()=>{setIsFlip(!isFlip)}}
                >
                    {isFlip? <StyledLeftIcon /> : <StyledRightIcon /> }
                </ArrowButton>
            </ButtonContainer>
            <Card $isFlipped={isFlip}>
                <CardFront>{front}</CardFront>
                <CardBack>{back}</CardBack>
            </Card>
            <Button onClick={sayHiHander}>
                Say Hi 👋
            </Button>
        </CardContainer>
    );
};

const CardContainer = styled.div`
    // perspective: 1000px;
    // border: 3px black solid;
    border-radius: 15px;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: right;
    background-color: white;
    padding: 5px 18px;
    position: relative;
    top: 15px;
    z-index: 2;
`;

const ArrowButton = styled.button`
    background: none;
    border: none;
    padding: 0px 0px;
    cursor: pointer;
`;

const StyledLeftIcon = styled(LeftIcon)`
    width: 20px;
    height: 20px;
`;

const StyledRightIcon = styled(RightIcon)`
    width: 20px;
    height: 20px;
`;  

const Card = styled.div`
    width: 40vh;
    height: 42vh;
 
    transition: transform 0.6s;
    transform-style: preserve-3d;
    transform: ${({ $isFlipped }) => ($isFlipped ? 'rotateY(180deg)' : 'rotateY(0)')};
    position: relative;
`;

const CardFace = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px 20px;
    border-radius: 15px;
    outline: none;
`;

const CardFront = styled(CardFace)`
    background: #fff;
`;

const CardBack = styled(CardFace)`
    // background: #f8f9fa;
    background: #fff;
    transform: rotateY(180deg);
`;

export default ProfileFlipCard;