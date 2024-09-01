'use client';
import React from 'react';
import styled from 'styled-components';
import FriendRequestItem from '../atoms/FriendRequestItem';

const FriendRequestList = ({ requests , ButtonGroup}) => {
  return (
    <ListContainer>
      {requests.map((request) => (
        <FriendRequestItem key={request.id} request={request} ButtonGroup={ButtonGroup} />
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  margin-top: 20px;
`;

export default FriendRequestList;