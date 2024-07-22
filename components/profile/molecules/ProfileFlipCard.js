'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';

const ProfileFlipCard = ({front, back}) => {
    const [isFlip, setIsFlip] = useState(false);

    return (
        <CardContainer>
            <Card $isFlipped={isFlip}>
                <CardFront>{front}</CardFront>
                <CardBack>{back}</CardBack>
            </Card>
            <Button onClick={()=>{setIsFlip(!isFlip)}}>
                {isFlip? 'Back' : 'View More'}
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

const Card = styled.div`
    width: 40vh;
    height: 45vh;
 
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
    padding: 20px 20px;
    border-radius: 15px;
    outline: none;
`;

const CardFront = styled(CardFace)`
    background: #fff;
`;

const CardBack = styled(CardFace)`
    background: #f8f9fa;
    transform: rotateY(180deg);
`;

export default ProfileFlipCard;