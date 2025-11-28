import styled, { keyframes } from 'styled-components';
import { getColorSettings } from '../../config.jsx';

const scrollLeftToRight = keyframes`
    0% { transform: translateX(-50%);}
    100% { transform: translateX(0);}
`;

export const Container = styled.div`
    width: 100%;
    overflow: hidden; 
    padding: 20px 0;
    position: relative;
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
`;

export const Track = styled.div`
    display: flex;
    width: max-content;
    gap: 60px; 
    animation: ${scrollLeftToRight} 40s linear infinite;
    &:hover {animation-play-state: paused;}
`;

export const Stack = styled.div`
    display: flex;
    align-items: center;
    flex-shrink: 0;

    & a {
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: white; 


        padding: 10px;

        gap: 10px;

        & svg {
            font-size: ${props => props.$iconSize || 30}px;
            height: auto;
            width: auto;
            color: ${props => props.$iconColor || '#FFFFFF'};
            transition: color 0.3s ease;
        }
        
        &:hover svg {color: ${props => getColorSettings(props.theme).primary};}
    }
    
    h3 {
        margin: 0;
        font-size: 1.2rem;
        margin-bottom: 5px;
    }
`;