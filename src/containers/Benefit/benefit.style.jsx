import styled from 'styled-components';
import { COLOR } from '../../config';
import { getColorSettings } from '../../config';


export const Container = styled.div`
    padding:  20px 30px 70px;
    height: auto;

    @media (max-width: 1200px) {
        padding:  20px 30px 70px;
    }
`

export const Text = styled.span`
    font-size: 1.2em;
    margin-bottom:50px;
    text-align: center;
    width: 100%;
    display: inline-block;
    color: #ffffffa2;
`

export const TextContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    margin: 0 auto;
    width: 90%;
    @media (max-width: 1200px) {
        flex-direction: column;
        height: 10%;
        text-align: center;
        justify-content: space-between;

        & div{
            height: 100%;
        }

    }
`;

export const Title = styled.h2`
    text-align: center;
    font-size: 3em;

    @media (max-width: 1200px) {
        line-height: 2em;
    }
`;

export const Info = styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height:430px;

    @media (max-width: 1200px) {
        gap: 10px;
    }

    & h3 {
        font-size: 1.4em;
        line-height: 1.6em;
        text-transform: uppercase;
        font-variation-settings: "wght" 500;
        color: ${props => getColorSettings(props.theme).primary};
    }

    & p {
        font-variation-settings: "wght" 350;
        font-size: 1em;
        line-height: 1.6em;
    }

    &.start{
        text-align: end;
        @media (max-width: 1200px) {text-align: center;}
    }


    &.end{
        text-align: end;
        @media (max-width: 1200px) {text-align: center;}
    }
`;

export const Img = styled.div`
    flex: 0 0 40%;
    display: flex;
    justify-content: center;
    align-items: center;


    @media (max-width: 1200px) {
        display: none;
    }

    & svg {
        padding: 10px;
        width: 60%;
        height: auto;
        color : ${props => getColorSettings(props.theme).primary};
    }
`;