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
    padding: 12px 20px;
    font-size: 18px;
    background-color: black;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: black;
    }
`;


export default Button;