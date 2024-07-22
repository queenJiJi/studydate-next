'use client';
import React,{forwardRef} from 'react';
import styled from 'styled-components';
import Label from '../atoms/Label';
import Input from '../atoms/Input';


// const FormField = ({label,type,placeholder,value,onChange,name}) => {
//     return (
//         <FieldWrapper>
//             <Label>{label}</Label>            
//             <Input 
//                 type={type} 
//                 placeholder={placeholder} 
//                 value={value} 
//                 onChange={onChange}
//                 name={name}
//             />
//         </FieldWrapper>
//     );
// };

// FormField의 부모컴포넌트인 SignUpForm.js에서 register를 썼기 때문에 그 안의 FormField는 forwardRef를 사용해서 부모가 직접적으로 FormField의 Dom에 접근할 수 있게 해야함
const FormField = forwardRef(({label,type,placeholder,value,onChange,name,error},ref) => {
    return (
        <FieldWrapper>
            <Label>{label}</Label>            
            <Input 
                type={type} 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange}
                name={name}
                ref={ref}
            />
            {error &&<ErrorMsg>{error.message}</ErrorMsg> }
        </FieldWrapper>
    );
});


const FieldWrapper = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const ErrorMsg= styled.div`
    font-size: 12px;
    margin-top: 4px;
    color: red;
`;

FormField.displayName = 'FormField';
export default FormField;