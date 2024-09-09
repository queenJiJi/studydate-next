'use client';

import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
// import userprofile from '@/data/users.json';
import ProfileList from '@/components/profile/organisms/ProfileList';
import Button from '@/components/profile/atoms/Button';
import { readProfile } from '@/api/profile';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';


const Profile = () => {
    // use query 적용 전
    // const [data, setData] = useState([]);
    
    // useEffect(()=>{
    //     const fetchData = async() => {
    //         const userprofile = await readProfile(); // readProfile은 비동기함수임 
    //         if (userprofile) {
    //             setData(userprofile)
    //         }
    //     }

    //     fetchData()
    // },[]); // 페이지 입장 시 데이터 fetching해오기

    const {data, isPending, isError} = useQuery({
        queryKey: ['profile'],
        queryFn: readProfile,
        staleTime: 1000 * 60 // ms 단위로 - 60초
    })

    // data fetching시 -> 로딩 처리, 에러 처리 필수
    // if (isPending) {
    //     return <div>Loading...</div>
    // }

    if (isError) {
        return <div>Fetching Error...</div>
    }

    return (
        <>
            <ProfileHeader>PROFILE LIST</ProfileHeader>
            {
                isPending? (<div>Loading...</div>): (<ProfileList data={data} />)
            }
        </>
    );
};

const ProfileHeader = styled.h1`
    text-align: center;
    margin: 20px 0;
`;

export default Profile;