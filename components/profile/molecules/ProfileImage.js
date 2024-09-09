'use client';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const ProfileImage = ({src, alt}) => {
    
    return (
        // <StyledImage src={src} alt={alt} />
        <ImageWrapper>
            <Image
                src={src}
                alt={alt}
                width={160}  // 이미지 너비 설정
                height={160} // 이미지 높이 설정
                // layout="fixed"  // 레이아웃 유형 설정
                // objectFit="cover" // 이미지 비율 유지
                style={{
                    borderRadius: '50%', // CSS 스타일 직접 적용
                    boxShadow: 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'
                }}
            />
        </ImageWrapper>
    );
};

const ImageWrapper = styled.div`
    width: 160px;
    height: 160px;
    border-radius: 50%;
    overflow: hidden;  // borderRadius를 적용하기 위해 overflow 설정
    margin-bottom: 15px;
`;

const StyledImage = styled.img`
    width: 160px;
    height: 160px;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
    object-fit: cover;
    margin-bottom: 15px;
`;

export default ProfileImage;