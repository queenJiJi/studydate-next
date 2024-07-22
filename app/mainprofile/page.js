'use client';

import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import userprofile from '@/data/users.json';
import ProfileList from '@/components/profile/organisms/ProfileList';
import Button from '@/components/profile/atoms/Button';


const Profile = () => {
    const [data, setData] = useState([]);
    
    useEffect(()=>{
        if (userprofile) {
            setData(userprofile)
        }
    },[]); // 페이지 입장 시 데이터 fetching해오기

    return (
        <>
            {/* <Title>
                <StyledButton onClick={()=> window.location.reload()}>FIND MY STUDYDATE</StyledButton>
            </Title> */}
            <ProfileList data={data} />
        </>
    );
};

// const Title = styled.div`
//     width: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `

// const StyledButton = styled(Button)`
//     background-color: white;
//     color: black;
//     font-size: 32px;
//     font-weight: 800;
//     width: 30%;

//     &:hover {
//         background-color: white;
//     }
// `;

export default Profile;