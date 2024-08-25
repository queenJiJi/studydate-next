'use client';

import React from 'react';
import styled from 'styled-components';
import ProfileCard from '@/components/profile/organisms/ProfileCard';
import ProfileForm from '@/components/createprofile/organisms/ProfileForm';
import { useQuery } from '@tanstack/react-query';
import { readMyProfile } from '@/api/profile';

const Page = () => {
    // 비구조화하면 해당 변수 이름 변경할 수 있음 ex. isError:hasMyProfile
    const {data, isPending, isError} = useQuery( 
        {
            queryKey:['profile','me'],
            queryFn: readMyProfile,
            retry: false, // retry: 데이터 fetching 실패 시 다시 시도 (횟수: default-5번)- 우리는 의도하고 back에서 404를 실패시 보낼 response code로 설정해뒀는데, false안하면 5번 404를 줄것임
        }
    );

    console.log(data)
    console.log(isError)

    if(isPending) return <div>Loading...</div>

    const hasMyProfile = !isError; // 에러가 없으면 내 프로필이 있는 것이니까 

    // 내 프로필이 있으면 내 프로필, 없으면, profileform 으로 새 프로필등록
    return ( 
        <>
            {
                hasMyProfile? (
                    <ProfileCard data={data} />):(<FormContainer>
                        <ProfileForm />
                    </FormContainer>  
                ) 
            }
        </>
    );
};

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 20px;
`;


export default Page;

