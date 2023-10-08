import styled from 'styled-components';
import { COLOR, SCREEN_SIZE } from '../../config';


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 55vh;
    font-size: 2em;
    margin: 0 auto;
    background-color: #202020;

    & .listContainer{
        width: 95%;
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        height: auto;
        padding-bottom: 30px;
    }
`
export const Title = styled.div`
    @media (max-width: ${SCREEN_SIZE.mobile}) {
        margin-top:30px;
    }
`
export const Text = styled.span`
    font-size: .6em;
    margin-bottom:50px;
`

export const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    height: 300px;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        height: auto;
    }

    & div{
        background-color: ${COLOR.primary};
        width: 300px;
        overflow: hidden;

        cursor: pointer;
        padding: 15px;

        & .title{
            font-size: .7em;
            font-variation-settings: "wght" 800;
            padding-bottom: 25px;
            position: relative;

           
            &:before{
                content: "";
                display: block;
                width: 20%;
                height: 10px;
                background: ${COLOR.secondary};
                left: 0;
                top: 65%;
                position: absolute;
            }
        }


        & p {
            font-size: .5em;
            line-height: 1.3em;
        }

        transition: all .6s ease;
           

        @media (min-width: ${SCREEN_SIZE.mobile}) {
            &:hover{
                width: 400px;
                transition: all .6s ease;
            }
        }
       
       
    }

   
`
