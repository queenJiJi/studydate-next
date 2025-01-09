'use client';

import React, {useState} from 'react';
import styled from 'styled-components';
import Button from '@/components/users/atoms/Button';
import { useRouter } from 'next/navigation';
import { ReactTyped } from "react-typed";

const Home = () => {
  const router = useRouter();
  // const [hideCursor, setHideCursor] = useState(false);

  return (
    <Wrapper>
      <TitleContainer>
        <Title>
          Find your <ReactTyped
          strings={["STUDY"]}
          typeSpeed={200}
          // loop
          backSpeed={10}
          cursorChar="|"
          showCursor={false}
          // onComplete={()=>setHideCursor(true)}
          style={{color:'pink'}}
        /> Mate
        </Title>
        <Title>
          Find your <ReactTyped
          strings={["DATE"]}
          typeSpeed={200}
          // loop
          backSpeed={10}
          // cursorChar="|"
          showCursor={false}
          style={{color:'pink'}}
          startDelay={1400}
        /> Mate
        </Title>
      </TitleContainer>
      <ButtonContainer>
        <StyledButton
          type="button"
          onClick={() => router.push('/login')}
        >
          ENTER
        </StyledButton>
      </ButtonContainer>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  // min-width: 1080px;
  min-height: 750px;
`;

const TitleContainer = styled.div`
  display: flex;
  padding-top: 200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: white; 
  font-weight: bold;
  font-size: 2.5rem; 
  margin: 0; 
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.div`
  display: flex;
  background-color: white;
  color: black;
  width: 300px;
  height: 50px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 24px;
  cursor: pointer;
`;