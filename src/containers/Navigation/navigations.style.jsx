import styled from 'styled-components';
import {getColorSettings, GetLightSetting,  SCREEN_SIZE} from '../../config.jsx'

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
    background-color: transparent;
    transition: background-color 0.3s ease;
    &.NavOpen{background-color: ${props => getColorSettings(props.theme).background};}

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

    color: red;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        flex-direction: column;
        height: 100vh;  
        padding: 5px 10px;
        border: none;
        
        &.NavClose{height: 5vh; transition: height 0.3s ease;}
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

        li {
            padding: 0 10px;
            a {
                text-decoration: none;
                font-weight: bold;
                transition: color 0.3s ease;
                cursor: pointer;
                &:hover{color: ${props => getColorSettings(props.theme).primary}; transition: color 0.3s ease;}
                span{
                    color: ${props => getColorSettings(props.theme).primary};
                    font-variation-settings: "wght" 1000;
                }

                @media (max-width: ${SCREEN_SIZE.mobile}) {
                    font-size: 1.2em;
                    font-variation-settings: "wght" 800;

                    display: block;
                    width: 100vw;
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