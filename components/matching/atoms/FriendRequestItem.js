'use client';
import React from 'react';
import styled from 'styled-components';

const FriendRequestItem = ({ request }) => {
  return (
    <ItemContainer>
      <ProfileImage src={request.profileImage} alt={`${request.name}'s profile`} />
      <RequestInfo>
        <Name>{request.name}</Name>
        <Status>{request.status}</Status>
      </RequestInfo>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const RequestInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-weight: bold;
`;

const Status = styled.div`
  color: gray;
`;

export default FriendRequestItem;