'use client';
import React from 'react';
import styled from 'styled-components';
import ProfileCard from './ProfileCard';
// import profilesData from '../../../data/users.json';

const ProfileList = ({data}) => {
    return (
        <ProfileListContainer>
            {data && data.length> 0 && data.map(userdata=>(
                <ProfileCard 
                    key={userdata.id}
                    data={userdata}
                />
            ))}
        </ProfileListContainer>
    );
};

const ProfileListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
`;

export default ProfileList;