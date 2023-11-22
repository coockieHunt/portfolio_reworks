import styled from 'styled-components';
import { COLOR } from '../../config';

export const FenceContainer = styled.div`
    display: flex;
    gap: 50px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 30px 19px;
`

export const IconList = styled.span`
    & > svg{
            color: ${COLOR.primary};
            height: 100%;
        }
`

export const CatchModal = styled.span`
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-size: 1rem;
    font-variation-settings: "wght" 200;
`

export const ListModal = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 30px;

    & > li{
        display: flex;
        align-items: center;
        gap: 10px;
        font-variation-settings: "wght" 300;
    }

`

export const Fence = styled.div`
    background-color: #292929;
    min-height: 200px;
    min-width: 200px;

    padding: 50px 20px;

    display: flex;
    align-items: start;
    justify-content: end;
    flex-direction: column;
    gap: 15px;

    border-radius: 10px;

    cursor: pointer;


    & > svg{
        color: ${COLOR.primary}; 
        font-size: 2em;
    }


    & .catch{
        color: white;
        font-variation-settings: "wght" 400;
    }

    & span{
        color: ${COLOR.primary}; 
        transition: all .3s ease-in;
        font-variation-settings: "wght" 600;

        display: inline-flex;
        align-items: center;
        & svg{
            transition: all .3s ease-in-out;
            margin-left: 5px
        }
    }

    &:hover{
        & > span > svg{
        transition: all .3s ease-in-out;

            margin-left: 10px
        }
    }
`
