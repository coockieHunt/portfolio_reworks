import styled from 'styled-components';
import { COLOR, SCREEN_SIZE } from '../../config';


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    background-color: #202020;
    width: 100%;


    & .listContainer{
        width: 95%;
        height: 100%;
        padding-bottom: 30px;
    }

    @media (max-width: 1200px) {
        padding-bottom: 30px;
    }
`
export const Title = styled.div`
    font-size: 2em;
    margin-top:30px;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        margin-top:30px;
    }
`
export const Text = styled.span`
    font-size: 1em;
    margin-bottom:50px;
`

export const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    height: auto;
    overflow: auto;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        height:100%;
    }

    & div{
        display: flex;
        flex-direction: column;
        height: 350px;


        background-color: ${COLOR.primary};
        width: 300px;
        padding: 20px;
        max-height: 500px;

        @media (max-width: ${SCREEN_SIZE.mobile}) {
            width: 90%;
        }
        cursor: pointer;

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
                background: ${COLOR.secondary};
                left: 0;
                top: 70%;
                position: absolute;
            }
        }


        & p {
            font-size: 1em;
            line-height: 1.3em;
            width: 100%;
        }

        transition: all .6s ease;

        &:hover
        {
            & .title{
                &:before{
                transition: all .6s ease;
                    width: 40%;
                }
            }
        }
           

        @media (min-width: ${SCREEN_SIZE.mobile}) {
            &:hover
             {
                width: 400px;
                transition: all .6s ease;
            }

            &:hover ~ div {
                width: 300px;
                transition: all .6s ease;
            }
        }
    }

   
`
