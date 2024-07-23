'use client';

import React from 'react';
import styled from 'styled-components';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const Step1 = ({nextStep, handleChange, data}) => {
    const {name, dream} = data;

    return (
        <Wrapper>
            <StepContainer>
                <Label>NAME</Label>
                <Input 
                    type='text'
                    value={name} 
                    onChange={(e)=>handleChange('name', e.target.value)}
                />

                <Label>DREAM</Label>
                <Input 
                    type='text'
                    value={dream} 
                    onChange={(e)=>handleChange('dream', e.target.value)} 
                />
            </StepContainer>
            <ButtonContainer>
                {/* <Button onClick={}>go back</Button> */}
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

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`;

export default Step1;
