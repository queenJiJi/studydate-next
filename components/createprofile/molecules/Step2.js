'use client';

import React from 'react';
import styled from 'styled-components';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const Step2 = ({prevStep, nextStep, handleChange, data}) => {
    const {intro} = data;

    return (
        <Wrapper>
            <StepContainer>
                <Label>INTRODUCTION</Label>
                <ContentBox>
                    <TextArea 
                        type='textarea'
                        value={intro} 
                        onChange={(e)=>handleChange('intro', e.target.value)}
                    />
                </ContentBox>
            </StepContainer>
            <ButtonContainer>
                <Button onClick={prevStep}>BACK</Button>
                <Button onClick={nextStep}>NEXT</Button>
            </ButtonContainer>
        </ Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StepContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 200px;
`;

const ContentBox = styled.div`
    width: 100%;
    height: 100%;
    max-width: 300px;
    min-height: 200px;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 100%;
    min-height: 200px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
`

export default Step2;
