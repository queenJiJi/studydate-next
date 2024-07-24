'use client';
import React from 'react';
import styled from 'styled-components';
import ProfileImage from '../molecules/ProfileImage';
import ProfileInfo from '../molecules/ProfileInfo';
import ProfileFlipCard from '../molecules/ProfileFlipCard';

const ProfileCard = ({data}) => {
    const frontContent = (
        <>
            <ProfileImage src={data.image} alt={data.name} />
            <ProfileInfo name={data.name} dream={data.dream} intro={data.intro} />
        </>
    );

    const backContent = (
        <BackWrapper>
            <BackContent>
                <BackTitle> ABOUT ME </BackTitle>
                <Content><strong> Grade: </strong>{data.grade}</Content>
                <Content><strong> Subjects: </strong> {Array.isArray(data.subjects) ? data.subjects.join(', ') : data.subjects}</Content>
                <Content><strong> Concerns: </strong>{data.concerns}</Content>
                <Content><strong> Ideal Type: </strong>{data.idealType}</Content>
            </BackContent>
        </BackWrapper>
    );
    return (
        <StyledCard>
            <ProfileFlipCard 
                front={frontContent}
                back={backContent}
            />
        </StyledCard>
    );
};


const BackWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    text-align: left;
    line-height: 1.5;
    border-radius: 10px;
`;

const BackContent = styled.div`
    display: flex;
    flex-direction: column;
`
const BackTitle = styled.div`
    font-size: 23px;
    font-weight: 700;
    text-align: center;
`

const Content = styled.div`
    font-size: 16px;
    margin: 10px 0;
`

const StyledCard = styled.div`
    margin: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;;
    &:hover {
        transform: translateY(-10px);
    }
`;

export default ProfileCard;