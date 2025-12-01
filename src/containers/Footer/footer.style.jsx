import { getColorSettings, SCREEN_SIZE } from "../../config";
import styled from 'styled-components';

export const Container = styled.footer`
    position: relative;
    width: 100%;
    overflow: hidden; 
    padding-top: 70px; 
    padding-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: auto;


    & .content-wrapper {
        z-index: 2; 
        width: 70%;
        padding: 10px 20px;
    }

    @media (max-width: ${SCREEN_SIZE.tablet}) {
        & .content-wrapper {
            width: 90%;
            padding: 10px 0;
        }
    }

    & .header-text {
        text-align: center;
        margin-bottom: 20px;
        & .catch {
            font-size: 3rem;
            line-height: 1.1;
            color: #fff;

            & .left, & .right {
                display: inline-block;     
                width: 45%;    
                vertical-align: top;
            }


            @media ( max-width: ${SCREEN_SIZE.tablet}) {
                position: relative;
                margin-bottom: 40px;

                & .left{
                    float: none;
                    transform: none;
                    position: relative;
                    z-index: 2;
                    width: 100%;
                    padding: 15px 0;
                }

                & .right{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 1;
                    opacity:.3;
                    width: 100%;
                }
            }
        }

        .creative {
            font-weight: 700;
        }
        .indus {
            color: ${(props) => getColorSettings(props.theme).primary};
            opacity: 0.8;
        }
    }

    .josbnfgbhibc {
        margin-bottom: 20px;
        opacity: 0.01;
        color: #ececec;
        cursor: default;
        text-align: center;
        position: relative;

        &:hover {
            opacity: 0.03;
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
        }

        @media ( max-width: ${SCREEN_SIZE.tablet}) {
            display: none;
        }
    }
`;

export const Aurora = styled.div`
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    height: 100%; 

    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 20%);
    mask-image: linear-gradient(to bottom, transparent 0%, black 20%);

	background: radial-gradient(
			ellipse 80% 75% at 50% -0%, 
			${props => getColorSettings(props.theme).primary} 40%, 
			${props => getColorSettings(props.theme).secondary} 4%, 
			transparent 90% 
	);
    
    filter: blur(60px);
    z-index: 0;
    pointer-events: none;
`;

export const BottomBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 20px;
    margin-top: 20px;

    .copyright {
        font-size: 0.85rem;
        color: #888;
    }

    .social-links {
        display: flex;
        gap: 15px;
    }

    .legal-links {
        display: flex;
        gap: 20px;
        button {
            background: none;
            border: none;
            color: #888;
            font-size: 0.85rem;
            cursor: pointer;
            transition: color 0.3s ease;

            display: flex;
            align-items: flex-end;
            gap: 10px;

            padding: 10px 5px;

            &.backToTop{
                color: ${props => getColorSettings(props.theme).primary};
                font-weight: 600;
            }

            & svg{
                margin-top: 4px;
            }

            &:hover {
                color: var(--theme-color, #fff);
            }

            & .opened {
                transform: rotate(180deg);
                transition: transform 0.3s ease;

            }
        }
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        flex-direction: column;
        gap: 20px;
        
        .social-links {
            order: 1; 
            margin-bottom: 10px;

        }
        .copyright { order: 2; }
        .legal-links { 
            order: 3; 
            flex-direction: column;
            gap: 0px;
        }
    }
`;

export const LegalContent = styled.div`
    overflow: hidden; 
    border-radius: 8px;
    color: #ccc;
    background-color: rgba(255, 255, 255, 0.05); 

    transition: 
        padding 0.3s ease-in-out,
        max-height 0.4s ease-in-out,
        opacity 0.2s ease-in-out;

    & h3 {
        margin-bottom: 10px;
        font-size: 1.5rem;
        font-weight: 600;
        &::first-letter {text-transform: uppercase;}
    }

    & h4 {
        font-size: 1.2rem;
        margin-top: 20px;
        margin-bottom: 10px;
        font-weight: 600;
        &::first-letter {text-transform: uppercase;}
    }

    & p {
        line-height: 1.6;
        margin-bottom: 10px;
        & strong{font-weight: 700;}
    }

    &.open {
        opacity: 1;
        max-height: 1000px; 
        padding: 20px;
        margin: 20px 0 80px 0;
    }

    &.closed {
        opacity: 0;
        max-height: 0;
        margin-top: 0;
        margin-bottom: 0;
        padding-top: 0;
        padding-bottom: 0;
        padding-left: 0;  
        padding-right: 0;
    }
`;