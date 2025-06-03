import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const pulse = keyframes`
  0% {
    transform: translateX(-50%) scale(1);
  }
  50% {
    transform: translateX(-50%) scale(1.05);
  }
  100% {
    transform: translateX(-50%) scale(1);
  }
`;

const LandingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/assets/landing-bg.png');
  background-size: cover;
  background-position: center;
  position: relative;
`;

const EnterButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  height: auto;
  padding: 1rem 2rem;
  border-radius: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.2) 25%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    rgba(255, 255, 255, 0.1) 100%
  );
  background-size: 200% 100%;
  border: 2px solid rgba(255, 255, 255, 0.8);
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  opacity: 1;
  transition: all 0.2s ease;
  z-index: 2;
  text-transform: uppercase;
  letter-spacing: 2px;
  min-width: 160px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  animation: ${shimmer} 3s infinite linear, ${pulse} 2s infinite ease-in-out;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  
  &:hover {
    background: #ffffff;
    color: #000000;
    animation: none;
    text-shadow: none;
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.4);
  }
`;

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <LandingContainer>
      <EnterButton onClick={onEnter}>
        Enter
      </EnterButton>
    </LandingContainer>
  );
}; 