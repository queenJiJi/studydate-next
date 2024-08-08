'use client';
import React from 'react';
import styled from 'styled-components';
import FriendRequestItem from '../atoms/FriendRequestItem';

const FriendRequestList = ({ requests }) => {
  return (
    <ListContainer>
      {requests.map((request) => (
        <FriendRequestItem key={request.id} request={request} />
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  margin-top: 20px;
`;

export default FriendRequestList;