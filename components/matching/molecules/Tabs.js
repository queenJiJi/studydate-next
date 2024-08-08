'use client';
import React from 'react';
import styled from 'styled-components';
import TabButton from '../atoms/TabButton';
// import Button from '@/components/profile/atoms/Button';

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <TabsContainer>
      <TabButton active={activeTab === 'received'} onClick={() => setActiveTab('received')}>
        받은 요청
      </TabButton>
      <TabButton active={activeTab === 'sent'} onClick={() => setActiveTab('sent')}>
        보낸 요청
      </TabButton>
      <TabButton active={activeTab === 'accepted'} onClick={() => setActiveTab('accepted')}>
        수락된 요청
      </TabButton>
    </TabsContainer>
  );
};

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export default Tabs;