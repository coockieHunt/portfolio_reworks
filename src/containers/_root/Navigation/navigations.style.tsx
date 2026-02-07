import styled from 'styled-components';
import { SCREEN_SIZE, BORDER_RADIUS } from '@/config';
import { HexToRgbaConverter } from '@/utils/HexToRgbaConverter';

const NAV_BREAKPOINT = `${parseInt(SCREEN_SIZE.mobile) + 300}px`;

export const NavigationContainer = styled.div`
    display: flex;
    align-items: center;
    height: 60px;
    padding: 15px;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 15;
    transition: background-color 0.3s ease;

    &.NavBackground {
        background-color: ${HexToRgbaConverter('var(--background-color)', 0.2)};
        backdrop-filter: blur(10px);
    }

  
    &.NavOpen {
        backdrop-filter: blur(10px);
        height: 100dvh;
        width: 100%;

        &::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--background-color);
            backdrop-filter: blur(5px);
            opacity: 0.8;
            z-index: -1;
        }
    }

    @media (max-width: ${NAV_BREAKPOINT}) {
        z-index: 1000;
        flex-direction: column;
        height: 100vh;
        height: 100dvh;
        padding: 5px 10px;

        &.NavClose {
            height: 60px;
            overflow: hidden;
        }
    }
`;

export const Logo = styled.img`
    width: 25px;
    height: auto;
    border-right: 1px solid #ffffff3b;
    box-sizing: content-box;

    @media (max-width: ${NAV_BREAKPOINT}) {
        flex-direction: column;
        height: 100vh;
        padding: 5px 10px;
        border: none;

        &.NavClose {
            height: 5vh;
            transition: height 0.1s ease-in-out;
        }
    }
`;

export const Nav = styled.nav`
    position: relative;
    display: flex;
    width: 100%;
    justify-content: space-between;
    z-index: 11;

    .cv-mobile-btn {
        display: none;
    }

    ul {
        display: flex;
        list-style: none;
        text-align: center;
        align-items: center;
        padding: 0;
        margin: 0;

        li {
            padding: 0 10px;

            &:not(.is-spacer):hover {
                color: var(--primary);
                transition:
                    color 0.2s ease,
                    transform 0.1s ease;
                transform: scale(1.05);
            }

            a {
                text-decoration: none;
                font-weight: bold;
                cursor: pointer;
                span {
                    color: var(--primary);
                    font-variation-settings: 'wght' 1000;
                }

                @media (max-width: ${NAV_BREAKPOINT}) {
                    font-size: 1em;
                    font-variation-settings: 'wght' 800;
                    display: block;
                    width: 100%;
                    padding: 30px;
                }
            }

            &.is-spacer {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 15px;

                pointer-events: none;

                .spacer {
                    display: block;
                    width: 1px;          
                    height: 20px;         
                    background-color: rgba(255, 255, 255, 0.5);
                }

                @media (max-width: ${NAV_BREAKPOINT}) {
                    width: 100%;         
                    padding: 0;         
                    margin: 15px 0;     

                    .spacer {
                        width: 80%;      
                        height: 1px;     
                        margin: 0 auto; 
                    }
                }
            }
        }
    }

    .info {
        display: flex;
        text-align: center;
        align-items: center;
        margin-left: 10px;
        gap: 15px;

        @media (max-width: ${NAV_BREAKPOINT}) {
            display: none;
        }
    }

    @media (max-width: ${NAV_BREAKPOINT}) {
        height: calc(100% - 60px);
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        &.NavClose {
            display: none;
        }
        &.NavOpen {
            display: flex;
        }

        ul {
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 30px 0 0 0;
            margin: 0;
            gap: 0;
            
            & li:not(.is-spacer) {
                padding: 0;
            }
        }

        .cv-mobile-btn {
            display: block;
            position: static;
            margin: 0 20px 25px 20px;
            width: calc(100% - 40px);
            text-align: center;
            transform: none;
            align-self: center;
        }
    }

    & button {
        padding: 5px 10px;
        border-radius: ${BORDER_RADIUS.small};
        border: 1px solid var(--primary);
        font-size: 0.8rem;
        background-color: transparent;
        cursor: pointer;
        font-weight: 600;
        letter-spacing: 0.5px;
        position: relative;
        overflow: hidden;
        color: var(--primary);
        transition:
            background-color 0.25s ease,
            color 0.25s ease,
            border-color 0.25s ease,
            transform 0.15s ease,
            box-shadow 0.25s ease;

        &::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(
                circle at 30% 30%,
                color-mix(in srgb, var(--primary) 20%, transparent),
                transparent 70%
            );
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }

        &:hover {
            background-color: var(--primary);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px -4px
                color-mix(in srgb, var(--primary) 53%, transparent);
            &::before {
                opacity: 0.4;
            }
            color: white;
        }

        &.cv-mobile-btn {
            font-size: 0.9rem;
            padding: 12px 18px;
            backdrop-filter: blur(6px);
            border: 1px solid var(--primary);
            color: var(--primary);

            &:hover {
                background: var(--primary);
                color: var(--background);
                box-shadow: 0 6px 18px -6px
                    color-mix(in srgb, var(--primary) 67%, transparent);
                transform: none;
                color: white;
            }
        }
    }
`;

export const BrandContainer = styled.div`
    height: 60px;
    min-height: 60px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: ${NAV_BREAKPOINT}) {
        width: 100%;
        padding: 0 10px;
    }

    & .burger-menu-wrapper {
        display: none;
        @media (max-width: ${NAV_BREAKPOINT}) {
            display: block;
        }
    }
`;
