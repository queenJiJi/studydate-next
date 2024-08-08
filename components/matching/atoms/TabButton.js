'use client';
import React from 'react';
import styled from 'styled-components';

const TabButton = ({ active, onClick, children }) => {
  return (
    <Button active={active} onClick={onClick}>
      {children}
    </Button>
  );
};

const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  background-color: ${({ active }) => (active ? 'black' : '#e0e0e0')};
  color: white;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color: 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? 'black' : '#c0c0c0')};
  }
`;

export default TabButton;