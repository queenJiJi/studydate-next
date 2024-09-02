'use client';
import React from 'react';
import styled from 'styled-components';
import TabButton from '../atoms/TabButton';
// import Button from '@/components/profile/atoms/Button';

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <TabsContainer>
      <TabButton active={activeTab === 'received'} onClick={() => setActiveTab('received')}>
        Received requests 
      </TabButton>
      <TabButton active={activeTab === 'sent'} onClick={() => setActiveTab('sent')}>
        Sent requests
      </TabButton>
      <TabButton active={activeTab === 'accepted'} onClick={() => setActiveTab('accepted')}>
        Accepted requests
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