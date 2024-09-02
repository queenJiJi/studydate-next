'use client';

import React, {useState,useEffect} from 'react';
import styled from 'styled-components';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const Step4 = ({prevStep, nextStep, handleImagePreview, handleChange, data}) => {
    const { idealType, image } = data;
    const [imageURL, setImageURL] = useState(image);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleChange('image', file); // 사진 업로드

            const reader = new FileReader();
            reader.onloadend = () =>{
                handleImagePreview(reader.result); // 사진 미리보기 경로 담기
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
            <Title>It&apos;s all done!</Title>
            <Title>We can match you with your ideal type! 🖤</Title>
            <Stage> STEP 4 / 4</Stage>

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

const Title = styled.div`
    font-weight: 800;
    font-size: 36px; 
`

const Stage = styled.div`
    color: #FF0000;
    font-size: 14px;
    margin-bottom: 20px;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-top: 20px;
`

export default Step4;

