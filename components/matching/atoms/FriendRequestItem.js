'use client';
import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Button from './Button';

const FriendRequestItem = ({ request, ButtonGroup }) => {
  return (
    <ItemContainer>
      <Info>
        {/* 이미지를 Next.js의 Image 컴포넌트로 변경 */}
        <ProfileImageWrapper>
          <Image
            src={request.profileImage}
            alt={`${request.name}'s profile`}
            width={50}
            height={50}
            unoptimized={true} // 로컬 이미지나 CDN이 아닌 경우 사용

            // objectFit="cover" // 이미지 비율 유지
            // style={{ borderRadius: '50%' }} // Next/Image는 style에 borderRadius를 직접 적용할 수 없으므로 아래에서 처리
          />
        </ProfileImageWrapper>
        <RequestInfo>
          <Name>{request.name}</Name>
          <Status>{request.status}</Status>
        </RequestInfo>
      </Info>
      {ButtonGroup && <ButtonGroup id={request.id}/>}
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

// ProfileImageWrapper를 추가하여 Image 컴포넌트를 스타일링합니다.
const ProfileImageWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%; // borderRadius 적용
  overflow: hidden; // borderRadius 효과를 위해 overflow를 hidden으로 설정
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


// const ButtonContiner = styled.div`
//   display: flex;
// `;

// const AcceptButton = styled(Button)`
//   background-color: #3ebd3e;
//   margin-right: 30px;

//   &:hover {
//     background-color: green;
//   }
// `;

// const RefuseButton = styled(Button)`
//   background-color: #f7283e;

//   &:hover {
//     background-color: #db0017;
//   }
// `;

export default FriendRequestItem;