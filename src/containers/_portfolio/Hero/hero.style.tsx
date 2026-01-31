import styled, { keyframes } from 'styled-components'; 
import { SCREEN_SIZE } from '@/config';

const pixelToRound = keyframes`
    0% {
        font-variation-settings: "wght" 500, "ROND" 0;
        transform: scale(0.98);
    }
    100% {
        font-variation-settings: "wght" 500, "ROND" 100;
        transform: scale(1);
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    min-height: 700px;
    position: relative;

    & .mouse {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 48px;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        z-index: 5;
    }

    & .split {
        height: 85%;
        width: 95%;
        display: flex;
        align-items: center;
        margin: 0 auto;

        & .text,
        & .cube {
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        & .text {
            padding-left: 8%;
            
            & h1 {
                font-size: clamp(2rem, 5vw, 3.5rem); 
                margin-bottom: 30px; 
                font-weight: 600; 
                line-height: 1.1;

                display: flex;
                flex-direction: column;
                gap: 0.2em; 
                max-width: 100%; 
            
                & span {
                    display: inline-flex; 
                    align-items: center;
                    flex-wrap: wrap; 
                    gap: 10px; 

                    & strong {
                        color: var(--primary);
                        font-family: 'Doto Variable', sans-serif;
                        font-size: 1.1em;
                        margin-left: 8px;
                        font-weight: 500;
                        
                        animation: ${pixelToRound} 2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards;
                        
                        font-variation-settings: "wght" 500, "ROND" 0;
                    }
                }
            }

            & p {
                font-size: 1.2em;
                line-height: 1.4;
                max-width: 550px;
                color: var(--font-subtle);
                margin-bottom: 20px;
            }

            & .cta {
                display: flex;
                gap: 20px;
                flex-wrap: wrap;
            }
        } 

        & .cube {
            align-items: center;
            justify-content: center;
            position: relative;
            & .scene {
                width: 90%;
                height: 70%;
            }
        }

        @media (max-width: ${SCREEN_SIZE.mobile}) {
            flex: none;
            width: 100%;
            flex-direction: column; 

            & .text {
                width: 100%;
                padding: 0 20px; 
                justify-content: center; 
                padding-top: 60px; 
                z-index: 2;

                & h1 {
                    font-size: 2.2em;
                }

                & p {
                    font-size: 1em;
                    max-width: 100%;
                }
            }

            & .cube {
                pointer-events: none;
                z-index: 1; 
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0.25; 

                & .scene {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        padding-top: 30px;
        height: auto;

        & .mouse {
            position: relative;
            margin-top: 50px;
            bottom: auto;
            left: auto;
            transform: scale(0.8);
            margin-bottom: 40px;
        }
    }

    @media (max-width: 400px) {
        & .mouse {
            display: none;
        }
    }
`;

export const Action = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 28px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.3);

    & a {
        text-decoration: none;
        color: inherit;
        width: 100%;
        height: 100%;
        display: flex; 
        align-items: center;
        justify-content: center;
    }

    &:hover {
        transform: translateY(-2px);
        border-color: #fff;
    }

    &.highlight {
        background-color: var(--primary);
        border: 1px solid var(--primary);
        box-shadow: 0 0 15px color-mix(in srgb, var(--primary) 25%, transparent);
        color: var(--font-on-primary);
        
        &:hover {
            background-color: var(--primary); 
            box-shadow: 0 0 25px color-mix(in srgb, var(--primary) 40%, transparent);
        }
    }

    & h2 {
        font-size: 1em;
        font-weight: inherit;
        margin: 0;
        pointer-events: none;
    }
`;