'use client';

import React, {useState,useEffect} from 'react';
import styled from 'styled-components';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const Step4 = ({prevStep, nextStep, handleChange, data}) => {
    const { idealType, image } = data;
    const [imageURL, setImageURL] = useState(image);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () =>{
                handleChange('image', reader.result);
                setImageURL(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // useEffect(()=>{
    //     console.log(imageURL)
    // },[imageURL])

    return (
        <StepContainer>
            <Label>IDEAL TYPE </Label>
            <Input
                type='text'
                value={idealType}
                onChange={(e)=> handleChange('idealType', e.target.value )}
            />
            <Label>Profile Image </Label>
            <Input
                type='file'
                accept = 'image/*'
                onChange={handleFile}
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
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`

export default Step4;

