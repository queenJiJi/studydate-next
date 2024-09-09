'use client';
import React, {useState, useEffect} from 'react';
import Tabs from '../molecules/Tabs';
import FriendRequestList from '../molecules/FriendRequestList';
import styled from 'styled-components';
import Button from '@/components/matching/atoms/Button';
import { readMatching, updateMatching } from '@/api/matching';
import { useAuth } from '@/store/authStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { sendSlack } from '@/api/user';

const MatchingPageContent = () => {
    const [activeTab, setActiveTab] = useState('received');

    const {data, isPending, isError} = useQuery({
        queryKey: ['matching'],
        queryFn: readMatching, 
        staleTime: 1000 * 60, // 어느 정도 시간이 흐른 이후에 데이터를 다시 가져올 것인지 (ms라 1000 * 60 = 60초)
    })

    // useEffect(async()=>{
    //     console.log(data)
    //     // await sendSlack(data.user.email);
    // },[data])

    if(isPending) <div>Loading...</div> //TODO: loading bar로 바꿔주기

    const firebaseId = useAuth((state) => state.firebaseId);

    // data가 아래 friendRequests 같은 형식을 띄지 않고 그냥 오니까, 들어올 때 각 received, sent, accepted에 맞는 데이터로 넣어주기
    const processMatchingData = (data) => {
        const friendRequests = {
            received: [],
            sent: [],
            accepted: [],
        };

        if(!data) return friendRequests;

        for(const request of data) { // for(let i=0;i<10;i++)~ 의 다른 버전으로 'for of'라는 문법임
            const receiverData = {
                id: request.id,
                name: request.receiverProfileName,
                profileImage: request.receiverProfileImg,
                status: request.status,
            }

            const senderData = {
                id: request.id,
                name: request.senderProfileName,
                profileImage: request.senderProfileImg,
                status: request.status,
            }

            if(request.status === 'pending') { // 'pending': 내가 보낸거나 받은 것
                if(request.senderFirebaseId === firebaseId) { // 보낸ID와 내 firebase가 같은 경우
                    friendRequests.sent.push(receiverData); // push (python에서는 append임)
                } else {
                    friendRequests.received.push(senderData);
                }
            } else if(request.status === 'accepted') {
                if(request.senderFirebaseId === firebaseId) { // 수락된 상황에선
                    friendRequests.accepted.push(receiverData); // 내가 상대방한테 보낸 경우, 내 데이터(receiverdata) 보여줌 
                } else {
                    friendRequests.accepted.push(senderData); // 상대방이 보내고 내가 받았을 경우 senderData를 보여줌
                }
            }
        }

        return friendRequests;
    }   


    if(isError) <div>Error...</div>

    // const friendRequests = processMatchingData(data);
    //TODO: 더미 데이터임 (API를 연동할 경우 대체)
    // const friendRequests = {
    //     received: [
    //     { id: 1, name: 'John Doe', profileImage: '/images/1.jpg', status: 'pending' },
    //     { id: 2, name: 'Jane Smith', profileImage: '/images/2.jpg', status: 'pending' },
    //     ],
    //     sent: [
    //     { id: 3, name: 'Mike Johnson', profileImage: '/images/3.jpg', status: 'pending' },
    //     ],
    //     accepted: [
    //     { id: 4, name: 'Emily Davis', profileImage: '/images/4.jpg', status: 'accepted' },
    //     ],
    // };

    const friendRequests = processMatchingData(data);
    const queryClient = useQueryClient();

    const ReceiveButtonGroup = ({id}) => {
        return (
            <ButtonContiner>
                <AcceptButton onClick={async ()=> 
                {
                    await updateMatching(id, {type:'accept'});
                    await queryClient.invalidateQueries({
                        queryKey: ['matching']
                    });
                }}>Accept</AcceptButton>
                <RefuseButton onClick={async ()=> 
                {
                    await updateMatching(id, {type:'decline'});
                    await queryClient.invalidateQueries({
                        queryKey: ['matching']
                    });
                }}>Decline</RefuseButton>
            </ButtonContiner>
        )
    }

    const SentButtonGroup = ({id}) => {
        return (
            <ButtonContiner>
                <RefuseButton onClick={async ()=> 
                {
                    await updateMatching(id, {type:'cancel'});
                    await queryClient.invalidateQueries({
                        queryKey: ['matching']
                    });
                }}>Cancel</RefuseButton>
            </ButtonContiner>
        )
    }

    const friendButtonGroup = {
        received: ReceiveButtonGroup,
        sent: SentButtonGroup,
        accepted: null,
    }

    return (
        <Container>
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <FriendRequestList requests={friendRequests[activeTab]} ButtonGroup={friendButtonGroup[activeTab]}/>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    max-width: 860px;
`

const ButtonContiner = styled.div`
  display: flex;
`;

const AcceptButton = styled(Button)`
  background-color: #3ebd3e;
  margin-right: 30px;

  &:hover {
    background-color: green;
  }
`;

const RefuseButton = styled(Button)`
  background-color: #f7283e;

  &:hover {
    background-color: #db0017;
  }
`;
export default MatchingPageContent;