import styled, { keyframes } from 'styled-components';
import { SCREEN_SIZE, BORDER_RADIUS } from '@/config';

// Animation pour l'apparition des cartes
const fadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;


export const Container = styled.div`
    width: 90%;
    margin: 0 auto;
`;

export const Grid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;

    margin-bottom: 60px;
`;

export const PostPreview = styled.li`
    display: flex;
    flex-direction: row;
    height: 250px;
    list-style: none;
    border: 1px solid #eeeeee1a;
    border-radius: ${BORDER_RADIUS.large};
    background: rgba(41, 40, 40, 0.8);
    overflow: hidden;
    
    // Animation d'entrée
    animation: ${fadeInUp} 0.6s ease forwards;
    opacity: 0;
    
    // Délai progressif pour chaque carte
    &:nth-child(1) { animation-delay: 0.1s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.3s; }
    &:nth-child(4) { animation-delay: 0.4s; }

    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        transform: translateY(-8px);
        box-shadow: 
            0 10px 40px var(--primary),
            0 0 0 1px var(--secondary);
        border-color: var(--secondary);
        
        img {
            filter: brightness(1.1);
            position: relative;
            
            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: var(--primary);
                opacity: 0.10;
            }
        }

        h2 {
            color: #a78bfa;
        }
    }

    img {
        width: 300px;
        height: 100%;
        object-fit: cover;
        filter: brightness(0.95);
    }

    & .content {
        flex: 1;
        position: relative;
        display: flex;
        flex-direction: column;

        h2 {
            background: linear-gradient(
                to right,
                rgba(0, 0, 0, 0.4) 0%,
                rgba(0, 0, 0, 0.2) 100%
            );
            padding: 20px;
            font-size: 1.1rem;
            margin: 0;
            color: var(--primary);
            transition: color 0.3s ease;

            &:first-letter {
                text-transform: uppercase;
            }
        }

        & .info {
            padding: 10px 20px;
            flex: 1;

            p {
                color: #999; 
                line-height: 1.6;
                margin: 0;
            }
        }

        & .footer {
            position: relative; 
            padding: 10px 20px;
            font-size: 0.85rem;
            color: #666; 
            display: flex;
            align-items: center;
            height: auto;
            width: 100%;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            background: rgba(0, 0, 0, 0.2);

            small {
                opacity: 0.8;
                transition: opacity 0.3s ease;
            }
        }
    }

    &:hover .footer small {
        opacity: 1;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;

        img {
            width: 100%;
            height: 200px;
        }

        & .content .footer {
            position: relative;
        }
    }
`;