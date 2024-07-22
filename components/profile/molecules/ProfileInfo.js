'use client';
import React from 'react';
import styled from 'styled-components';
import Label from '../atoms/Label';

const ProfileInfo = ({name, dream, intro}) => {
    return (
        <InfoContainer>
           <StyledLabel>{name}</StyledLabel>
           <Dream>{dream}</Dream>
           <Intro>{intro}</Intro>
        </InfoContainer>
    );
};

const InfoContainer = styled.div`
    text-align: center;
    margin-top: 10px;
`;

const StyledLabel = styled(Label)`
    font-size: 1.2em;
    margin: 10px 0;
`;

const Dream = styled.p`
    font-size: 1em;
    color: #777;
    margin: 5px 0;
`;

const Intro = styled.p`
    font-size: 0.9em;
    color: #555;
`;

export default ProfileInfo;
