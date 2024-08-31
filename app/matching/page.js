'use client';

import React from 'react';
import styled from 'styled-components';
import MatchingPageContent from '@/components/matching/organisms/MatchingPageContent';


const MatchingStats = () => {
    return (
        <OuterContainer>
            <Title>Matching Status</Title>
            <MatchingPageContent />
        </OuterContainer>
    );
};

const OuterContainer = styled.div`
    width: 100%;
    height: 100%;
    min-height: 960px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 50px;
`;

const Title = styled.div`
    width: 100%;
    height: 40px;
    padding-top: 50px;
    padding-bottom: 20px;
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    font-size: 30px;
    font-weight: 800;
`;



export default MatchingStats;

