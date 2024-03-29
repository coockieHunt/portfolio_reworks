import styled from 'styled-components';
import {getColorSettings, GetLightSetting,  SCREEN_SIZE} from '../../config'

export const NavigationContainer = styled.div`
    display: flex;
    align-items: center;
    height: 60px;
    position: relative;
    padding: 15px;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        flex-direction: column;
        height: 100vh;  
        padding: 5px 10px;
        
        &.NavClose{height: 5vh; transition: height 0.3s ease;}
    }
`

export const Logo = styled.img`
    max-width: 20px;
    padding:  0 10px;
    border-right: 1px solid #ffffff3b;

    box-sizing: content-box;
    width: 100%;

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
    background-color: ${props => GetLightSetting(props.light).background};
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
    height: 95%;
    width: 100%;
    ul {
        height: 100%;
        flex-direction: column;
        justify-content: space-around;

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
    height: 5vh;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        width: 100%;
        padding: 0;
    }
`