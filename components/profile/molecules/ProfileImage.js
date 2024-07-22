'use client';
import React from 'react';
import styled from 'styled-components';

const ProfileImage = ({src, alt}) => {
    
    return (
        <StyledImage src={src} alt={alt} />
    );
};

const StyledImage = styled.img`
    width: 160px;
    height: 160px;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
    object-fit: cover;
    margin-bottom: 15px;
`;

export default ProfileImage;