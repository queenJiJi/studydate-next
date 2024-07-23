'use client';

import React from 'react';
import styled from 'styled-components';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const Step3 = ({prevStep, nextStep, handleChange, data}) => {
    const { grade, subjects, concerns } = data;

    return (
        <StepContainer>
            <Label>GRADE </Label>
            <Input
                type='text'
                value={grade}
                onChange={(e)=> handleChange('grade', e.target.value )}
            />

            <Label>SUBJECTS </Label>
            <Input
                type='text'
                value={subjects}
                onChange={(e)=> handleChange('subjects', e.target.value )}
            />

            <Label>CONCERNS </Label>
            <Input
                type='text'
                value={concerns}
                onChange={(e)=> handleChange('concerns', e.target.value )}
            />
           
           <ButtonContainer>
                <Button onClick={prevStep}>BACK</Button>
                <Button onClick={nextStep}>NEXT</Button>
           </ButtonContainer>
        </StepContainer>
    );
};

const StepContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-width: 300px;
    min-height: 200px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`

export default Step3;

