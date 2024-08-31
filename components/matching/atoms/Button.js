'use client';
import React from 'react';
import styled from 'styled-components';

const Button = ({type, onClick, children, className}) => {
    return (
        <StyledButton type={type} onClick={onClick} className={className}>
            {children}
        </StyledButton>
    );
};

const StyledButton = styled.button`
    font-size: 15px;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100px;
    height: 40px;
    transition: background-color 0.3s ease;
`;


export default Button;