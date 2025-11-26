import styled from 'styled-components';
import {getColorSettings,  SCREEN_SIZE} from '../../config.jsx'

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
    overflow-y: auto;
    ul {
        min-height: 100%;
        flex-direction: column;
        justify-content: space-around;
        padding-bottom: 20px;

        & li{padding: 0;}
    }

    &.NavClose {
      display: none;
      transition: display 0.3s ease;
    }

    &.NavOpen {
      display: block;
      transition: display 0.3s ease;
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