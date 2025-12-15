import styled, { keyframes } from 'styled-components';
import { getColorSettings } from '../../../config.js';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { opacity: 0.5; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.5; transform: scale(0.95); }
`;

const textBlink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  width: 100%;
  background-color: #121212;
  position: fixed; 
  top: 0;
  left: 0;
  z-index: 9999;
`;

export const NeonRing = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid transparent;
  border-top-color: ${props => getColorSettings(props.theme).primary || '#eae9f0'}; 
  border-right-color: ${props => getColorSettings(props.theme).secondary || '#cccdce'}; 
  
  box-shadow: 0 0 15px ${props => getColorSettings(props.theme).primary || '#cccdce'}40; 
  
  animation: ${spin} 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite; 
`;

export const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 1rem;
  color: ${props => getColorSettings(props.theme).font_subtle || '#cccccc'};
  letter-spacing: 2px;
  text-transform: uppercase;
  animation: ${textBlink} 2s ease-in-out infinite;

  &::after {
    content: '...';
    display: inline-block;
    width: 20px;
    text-align: left;
  }
`;

const LogoContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.5;
    animation: ${pulse} 2s ease-in-out infinite;
    
    width: 40px; 
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img, svg {
        width: 100%;
        height: auto;
    }
`;