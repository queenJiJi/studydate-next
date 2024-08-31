'use client';
import React, {useState} from 'react';
import Tabs from '../molecules/Tabs';
import FriendRequestList from '../molecules/FriendRequestList';
import styled from 'styled-components';


const MatchingPageContent = () => {
    const [activeTab, setActiveTab] = useState('received');

    //TODO: 더미 데이터임 (API를 연동할 경우 대체)
    const friendRequests = {
        received: [
        { id: 1, name: 'John Doe', profileImage: '/images/1.jpg', status: 'pending' },
        { id: 2, name: 'Jane Smith', profileImage: '/images/2.jpg', status: 'pending' },
        ],
        sent: [
        { id: 3, name: 'Mike Johnson', profileImage: '/images/3.jpg', status: 'pending' },
        ],
        accepted: [
        { id: 4, name: 'Emily Davis', profileImage: '/images/4.jpg', status: 'accepted' },
        ],
    };

    return (
        <Container>
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <FriendRequestList requests={friendRequests[activeTab]} />
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    max-width: 860px;
`
export default MatchingPageContent;