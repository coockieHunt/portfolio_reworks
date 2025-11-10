import styled from 'styled-components';
import {SCREEN_SIZE, getColorSettings, GetLightSetting } from '../../config.jsx';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    color: white;
    background-color: ${props => GetLightSetting(props.ligh).background_secondary};

    padding:  15px 0 25px 0;

    & .listContainer{padding-bottom: 30px;}
    @media (max-width: 1200px) {padding-bottom: 30px;}
`

export const List = styled.div`
    margin-top:50px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;

    @media (max-width: ${SCREEN_SIZE.mobile}) {height:90%;}

    & div{
        display: flex;
        flex-direction: column;
        background-color: ${props => getColorSettings(props.theme).primary};
        width: 300px;
        height: auto;
        height: 350px;
        padding: 20px;
        cursor: pointer;
        transition: all .6s ease;

        & .title{
            font-size: 1.6em;
            font-variation-settings: "wght" 800;
            padding-bottom: 25px;
            position: relative;
           
            &:before{
                transition: all .6s ease;
                content: "";
                display: block;
                width: 20%;
                height: 10px;
                background: ${props => getColorSettings(props.theme).secondary};
                left: 0;
                top: 75%;
                position: absolute;
            }
        }


        & p {
            font-size: 1em;
            line-height: 1.3em;
            width: 100%;
        }


        &:hover
        {
            transform: scale(1.05);
            & .title:before{
                transition: all .6s ease;
                width: 40%;
            }
        }
           

        @media (min-width: ${SCREEN_SIZE.mobile}) {&:hover{transition: all .6s ease;}}
        @media (max-width: ${SCREEN_SIZE.mobile}) {width: 70%;}
    }

   
`
