import styled from 'styled-components';
import {getColorSettings, SCREEN_SIZE} from '../../config'

export const Container = styled.div`
    padding: 25px 0;
`

export const PriceInfo = styled.div`
    text-align: center;
    padding: 15px 0;
    & svg{color: ${props => getColorSettings(props.theme).primary};}
`

export const ProductContainer = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    padding: 0 10px;
    gap: 50px;
    flex-wrap: wrap;
`

export const ItemProduct = styled.div`
    background-color: ${props => getColorSettings(props.theme).background_accentuated};
    width: 400px;
    min-width: 400px;
    height: 400px;
    
    border-radius: 10px;
    cursor: pointer;
    padding: 30px 20px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    transition: all .3s ease-in-out;

    &:hover{
        transition: all .3s ease-in-out;
        & .bottom .ViewMore svg{margin-left: 10px;}
    }

    & .top{
        & #title{
            font-size: 30px;
            font-variation-settings: "wght" 600;
        }
        & #subtitle{
            font-size: 20;
            font-variation-settings: "wght" 400;
            color: #929294;
        }

        & p{
            margin-top: 15px;
        }
    }

    & .bottom{
        & .info{
            display: flex;
            align-items: center;
            margin-top: 60px;
            
            & svg{
                color: ${props => getColorSettings(props.theme).primary};
            }
        }   

        & .ViewMore{
            font-variation-settings: "wght" 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            line-height: 1.5em;
            margin-top: 10px;
            color:  ${props => getColorSettings(props.theme).primary};
            width: 100%;
            
            & svg{
                transition: all .3s ease-in-out;
                margin-left: 5px;
                transition: all .3s ease-in;
            }


        }
    }

   
`
