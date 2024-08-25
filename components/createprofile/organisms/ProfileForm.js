'use client';

import React,{useState} from 'react';
import Step1 from '../molecules/Step1';
import Step2 from '../molecules/Step2';
import Step3 from '../molecules/Step3';
import Step4 from '../molecules/Step4';
import StepFinal from '../molecules/StepFinal';

const ProfileForm = () => {
    const [step, setStep] = useState(1);
    const [dataForm, setDataForm] = useState({
        name: '',
        dream: '',
        intro: '',
        grade: '',
        subjects: '',
        concerns: '',
        idealType: '',
        image: ''
    });

    const [imagePreview,setImagePreview] = useState('');

    const handleChange = (inputType, value) => {
       setDataForm(
        {
            ...dataForm,
            [inputType]: value
        }
       ) 
    };

    const prevStep = () => {
        setStep(prev => prev-1)};
    const nextStep = () => {
        setStep(next => next+1)};
    
    
    switch(step) {
        case 1: 
            return <Step1 
                        nextStep={nextStep} 
                        handleChange={handleChange} 
                        data={dataForm}/>;
        case 2: 
            return <Step2 
                        prevStep={prevStep} 
                        nextStep={nextStep} 
                        handleChange={handleChange} 
                        data={dataForm}/>;
        case 3: 
            return <Step3 
                        prevStep={prevStep} 
                        nextStep={nextStep} 
                        handleChange={handleChange} 
                        data={dataForm}/>;
        case 4: 
            return <Step4 
                        prevStep={prevStep} 
                        nextStep={nextStep} 
                        handleImagePreview={setImagePreview}
                        handleChange={handleChange} 
                        data={dataForm}/>;
        case 5: 
            return <StepFinal 
                        prevStep={prevStep} 
                        handleChange={handleChange} 
                        imagePreview={imagePreview}
                        data={dataForm}/>;
        default: return <Step1 nextStep={nextStep} handleChange={handleChange} data={dataForm}/>;
    }
};

export default ProfileForm;