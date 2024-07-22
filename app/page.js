'use client';

import React from 'react';
import styled from 'styled-components';
import Button from '@/components/users/atoms/Button';
import backgroundImg from "@/assets/wallpaper.jpeg";
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation';

const Home = () => {
  // const navigate = useNavigate();
  const router = useRouter();

  return (
    <>
      <Wrapper>
        <TitleContainer>
          <Title>Find your <span style={{color:'black'}}>Study</span>Mate</Title>
          <Title>Find your <span style={{color:'black'}}>Date</span>Mate</Title>
        </TitleContainer>
        <ButtonContainer>
          <StyledButton
            type="button"
            // onClick={() => navigate('/login')}
            onClick={() => router.push('/login')}
          >
            ENTER
          </StyledButton>
        </ButtonContainer>
      </Wrapper>
    </>
  );
};

export default Home;

const Wrapper = styled.div`
  position: relative;
  background-image: url(${backgroundImg.src});
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  isolation: isolate;

  :after {
    content: '';
    position: absolute;
    background: white;
    z-index: -1;
    inset: 0;
    opacity: 0.05;
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: white; 
  font-weight: bold;
  font-size: 2.5rem; 
  margin: 0; 
`;

const ButtonContainer = styled.div`
  /* Center the button horizontally */
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  /* Inherit styles from Button component, customize as needed */
`;
