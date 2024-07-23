'use client';
import React from 'react';
import styled from 'styled-components';

const Label = ({children}) => (
    <StyledLabel>
    {children}
  </StyledLabel>
);

const StyledLabel = styled.label`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
    display: block;
    color: #333;
`;

export default Label;