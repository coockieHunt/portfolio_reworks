import styled from 'styled-components';
import { BORDER_RADIUS, SCREEN_SIZE } from '@/config';

// Container
export const Container = styled.div`
    display: flex;
    width: 90vw;
    margin: 50px auto 70px auto;
    border-radius: ${BORDER_RADIUS.xxxlarge};
    gap: 30px;
    
    @media (max-width: ${SCREEN_SIZE.mobile}) {
        width: 90%;
        flex-direction: column;
    }
`;

export const Text = styled.span`
    font-size: 1.2em;
    text-align: center;
    width: 100%;
    display: inline-block;
    padding: 0 25px;
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    width: 30%;
    padding: 25px;
    box-sizing: border-box;
    border-radius: ${BORDER_RADIUS.xxlarge};
    border: 1px solid var(--primary);
    border-bottom: 8px solid var(--primary);
    position: relative;
    background: linear-gradient(135deg, rgba(29, 29, 29, 0.4), rgba(29, 29, 29, 0.2));
    backdrop-filter: blur(10px);

    & .content {
        display: flex;
        flex-direction: column;
        height: 100%;

        & .title {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 10px 0 25px 0;
            
            & h2 {
                font-size: 1.5em;
                color: var(--primary);
                font-weight: 600;
            }

            & span {
                font-size: 1em;
                color: var(--font-subtle);
            }
        }
        
        & .container {
            display: flex;
            flex-direction: column;
            padding-bottom: 20px;

            & .ItemInfo {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 12px 8px;
                border-radius: ${BORDER_RADIUS.xlarge};
                transition: all 0.3s ease;
                
                & svg {
                    height: 3em;
                    width: auto;
                    padding: 12px;
                    background-color: var(--primary);
                    border-radius: ${BORDER_RADIUS.xlarge};
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    z-index: 2;
                }

                & > div {
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                    
                    & .name {
                        color: var(--font-subtle);
                        font-size: 0.9em;
                        transition: color 0.3s ease;
                    }
                    
                    & .info {
                        font-weight: 500;
                    }
                }

                &:hover {
                    transform: translateX(8px);
                    background: rgba(255, 255, 255, 0.03);
                    
                    & svg {
                        transform: scale(1.1);
                        box-shadow: 0 4px 12px color-mix(in srgb, var(--primary) 25%, transparent);
                    }
                    
                    & .name {
                        color: var(--primary);
                    }
                }
            }
        }

        & .bottom {
            margin-top: auto;
            display: block;
            border-top: 1px solid #ffffff28;
            line-height: 3em;
            color: var(--font-subtle);
            font-size: 0.9em;
        }
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        width: 100%;
        padding: 20px;

        & .content {
            & .container {
                flex-direction: row;
                width: 100%;
                justify-content: space-between;

                & .info {display: none;}
                & .name {display: none;}
                & a .textInfo {display: none;}   
            }
            
            & .title {
                & h2 {
                    font-size: 1.2em;
                    text-align: center;
                }

                & span {
                    font-size: 0.9em;
                    text-align: center;
                }
            }

            & .bottom {
                text-align: center;
                font-size: 0.9em;
            }
        }
    }
`;

export const ContactForm = styled.div`
    margin: auto;
    width: 70%;
    padding: 35px;

    background: linear-gradient(135deg, 
        var(--background-tertiary),
        color-mix(in srgb, var(--primary) 8%, transparent)
    );

    border: 1px solid var(--primary);
    border-bottom: 8px solid var(--primary);
    border-radius: ${BORDER_RADIUS.xxlarge};
        
    --breath-color: var(--primary);
    --shadow-blur-min: 10px;
    --shadow-blur-max: 20px;
    --shadow-spread-min: 4px;
    --shadow-spread-max: 6px;
    
    box-shadow: 0 var(--shadow-spread-min) var(--shadow-blur-min) var(--breath-color);
    transition: box-shadow 0.3s ease;
    animation: breathe 10s cubic-bezier(0.4, 0, 0.2, 1) infinite;

    & h2 {
        font-size: 1.8em;
        color: var(--primary);
        font-weight: 600;
        margin-bottom: 10px;
        position: relative;
        z-index: 1;
    }


    @keyframes breathe {
        0%, 100% {
            box-shadow: 0 var(--shadow-spread-min) var(--shadow-blur-min) var(--breath-color);
        }
        25% {
            box-shadow: 0 6px 20px var(--breath-color);
        }
        50% {
            box-shadow: 0 var(--shadow-spread-max) var(--shadow-blur-max) var(--breath-color);
        }
        75% {
            box-shadow: 0 6px 20px var(--breath-color);
        }
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        width: 100%;
        padding: 25px;
        
        & h2 {
            font-size: 1.6em;
            line-height: 1.4em;
        }
    }
`;

export const ActionForm = styled.div`
    min-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    & > span {
        color: var(--font-subtle);
        cursor: pointer;
        font-size: 0.95em;
        transition: all 0.3s ease;
        padding: 8px 12px;
        border-radius: ${BORDER_RADIUS.medium};
        
        &:hover {
            color: var(--primary);
            background: rgba(255, 255, 255, 0.05);
        }
    }

    & > .colored {
        color: var(--primary);
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        flex-direction: column;
        gap: 15px;
        
        & .resetForm {
            display: none;
        }
    }
`;

export const Title = styled.h2`
    text-align: center;
    font-size: 3em;
    padding: 20px;
    
    @media (max-width: ${SCREEN_SIZE.mobile}) {
        font-size: 2em;
    }
`;

export const FormInstruction = styled.span`
    display: block;
    color: var(--font-subtle);
    font-size: 0.85em;
    margin-top: -10px;
    margin-bottom: 20px;
    font-style: italic;

    & span {
        color: var(--primary);
        font-weight: bold;
    }
`;
