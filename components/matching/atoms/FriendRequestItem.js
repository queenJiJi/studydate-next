'use client';
import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const FriendRequestItem = ({ request, ButtonGroup }) => {
  
  return (
    <ItemContainer>
      <Info>
        <ProfileImage src={request.profileImage} alt={`${request.name}'s profile`} />
        <RequestInfo>
          <Name>{request.name}</Name>
          <Status>{request.status}</Status>
        </RequestInfo>
      </Info>
      {/* <ButtonContiner>
        <AcceptButton>Accept</AcceptButton>
        <RefuseButton>Decline</RefuseButton>
      </ButtonContiner> */}
      {ButtonGroup&&<ButtonGroup id={request.id}/>}
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const Info = styled.div`
  display: flex;
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

export default FriendRequestItem;