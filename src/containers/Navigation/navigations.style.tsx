import styled from 'styled-components';
import { getColorSettings, SCREEN_SIZE, BORDER_RADIUS } from '../../config'

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

    &.NavOpen{
        backdrop-filter: blur(10px);
        height: 100dvh;
        width: 100%;

        &::after{
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${props => getColorSettings(props.theme).background_tertiary};
            backdrop-filter: blur(5px);
            opacity: .8;
            z-index: -1;
        }
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        z-index: 1000;
        flex-direction: column;
        height: 100vh;
        height: 100dvh;
        padding: 5px 10px;
        
        &.NavClose{
            height: 60px;
            overflow: hidden;
        }
    }
`

export const Logo = styled.img`
    width: 25px;
    height: auto;
    border-right: 1px solid #ffffff3b;
    box-sizing: content-box;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        flex-direction: column;
        height: 100vh;  
        padding: 5px 10px;
        border: none;
        
        &.NavClose{height: 5vh; transition: height .1s ease-in-out;}
    }
`;

export const Nav = styled.nav`
    position: relative;
    display: flex;
    width: 100%;
    justify-content: space-between;
    z-index: 11;

    .cv-mobile-btn {display: none;}
    
    ul {
        display: flex;
        list-style: none;
        text-align: center;
        align-items: center;
        padding: 0; 
        margin: 0;

        li {
            padding: 0 10px;
            &:hover{
                color: ${props => getColorSettings(props.theme).primary}; 
                transition: color .2s ease, transform .1s ease;
                transform: scale(1.05);
            }

            a {
                text-decoration: none;
                font-weight: bold;
                cursor: pointer;
                span{
                    color: ${props => getColorSettings(props.theme).primary};
                    font-variation-settings: "wght" 1000;
                    
                }

                @media (max-width: ${SCREEN_SIZE.mobile}) {
                    font-size: 1.2em;
                    font-variation-settings: "wght" 800;

                    display: block;
                    width: 100%;
                    padding: 30px;
                }
            }
        }
  }

    .info{
        display: flex;
        text-align: center;
        align-items: center;
        margin-left: 10px;
        gap: 15px;

        @media (max-width: ${SCREEN_SIZE.mobile}) {display: none;}
    }

  @media (max-width: ${SCREEN_SIZE.mobile}) {
        height: calc(100% - 60px);
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        &.NavClose { display: none; }
        &.NavOpen { display: flex; }

        ul {
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 30px 0 0 0;
            margin: 0;
            gap: 0;
            & li { padding: 0; }
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

  & button{
    padding: 5px 10px;
    border-radius: ${BORDER_RADIUS.small};
    border: 1px solid ${props => getColorSettings(props.theme).primary};
    font-size: .8rem;
    background-color: transparent;
    cursor: pointer;
    font-weight: 600;
        letter-spacing: .5px;
        position: relative;
        overflow: hidden;
        color: ${props => getColorSettings(props.theme).primary};
        transition: background-color .25s ease, color .25s ease, border-color .25s ease, transform .15s ease, box-shadow .25s ease;

        &::before{
            content: "";
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 30% 30%, ${props => getColorSettings(props.theme).primary}33, transparent 70%);
            opacity: 0;
            transition: opacity .3s ease;
            pointer-events: none;
        }

        &:hover{
                background-color: ${props => getColorSettings(props.theme).primary};
                color: white;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px -4px ${props => getColorSettings(props.theme).primary}88;
                &::before{opacity: .4;}
        }

        &:active{
                transform: translateY(0);
                box-shadow: inset 0 2px 6px -2px #00000055;
        }

        &:focus-visible{
                outline: 2px solid ${props => getColorSettings(props.theme).primary};
                outline-offset: 3px;
        }

        &.cv-mobile-btn{
            font-size: .9rem;
            padding: 12px 18px;
            backdrop-filter: blur(6px);
            border: 1px solid ${props => getColorSettings(props.theme).primary};
            background: linear-gradient(145deg, ${props => getColorSettings(props.theme).background}99, ${props => getColorSettings(props.theme).background_secondary}aa);
            color: ${props => getColorSettings(props.theme).primary};
            transition: background .35s ease, color .25s ease, transform .15s ease, box-shadow .25s ease;
            transform: none; 
            will-change: background, color, box-shadow;
            &:hover{
                background: ${props => getColorSettings(props.theme).primary};
                color: ${props => getColorSettings(props.theme).background};
                box-shadow: 0 6px 18px -6px ${props => getColorSettings(props.theme).primary}aa;
                transform: none; 
            }
            &:active{
                box-shadow: inset 0 2px 6px -2px #00000055;
                transform: none; 
            }
            &:focus-visible{
                outline: 2px solid ${props => getColorSettings(props.theme).primary};
                outline-offset: 2px; 
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

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        width: 100%;
        padding: 0 10px;
    }

    & .burger-menu-wrapper {
        display: none;
        @media (max-width: ${SCREEN_SIZE.mobile}) {
            display: block;
        }
    }
`
