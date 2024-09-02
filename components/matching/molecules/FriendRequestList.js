'use client';
import React from 'react';
import styled from 'styled-components';
import FriendRequestItem from '../atoms/FriendRequestItem';

const FriendRequestList = ({ requests , ButtonGroup}) => {
  console.log(requests)
  return (
    <ListContainer>
      {requests.length!=0? requests.map((request) => (
        <FriendRequestItem key={request.id} request={request} ButtonGroup={ButtonGroup} />
      )): <EmptyContainer>You don't have any requests yet 🫥</EmptyContainer>}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  margin-top: 20px;
`;

const EmptyContainer = styled.div`
  width: 100%;
  min-height: 500px;
  background-color: #E0E0E0;
  display: flex;
  color: black;
  font-weight: 700;
  justify-content: center;
  align-items: center;
`;

export default FriendRequestList;