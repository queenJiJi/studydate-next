'use client';

import React,{forwardRef} from 'react';
import styled from 'styled-components';

// 부모컴포넌트인 FormField.js에서 forwardRef를 썼기 때문에 그 안의 Input.js는 forwardRef를 사용해서 부모가 직접적으로 Input의 Dom에 접근할 수 있게 해야함
const Input = forwardRef(({type, placeholder,value,onChange,name },ref) => {
    return (
        <StyledInput 
            type={type}
            placeholder={placeholder}
            value = {value}
            onChange={onChange}
            name={name}
            ref={ref}
        />
    );
});

// const StyledInput = styled.input`
//     padding: 8px;
//     font-size: 16px;
//     // margin-bottom: 10px;
//     width: 100%;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//     // box-sizing: border-box; // global- index.css에 적용시키기
// `;


const StyledInput = styled.input`
    padding: 12px;
    font-size: 16px;
    margin-bottom: 10px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: red;
        outline: none;
    }
`;

Input.displayName = 'Input';
export default Input;