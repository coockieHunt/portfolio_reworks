import styled from 'styled-components';
import { COLOR } from '../../config';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 40px 150px;

    @media (max-width: 1200px) {
        flex-direction: column;
        height: auto;

        padding: 40px 30px 80px 30px;
        text-align: center;

        gap: 40px;
    }
`;

export const Title = styled.h1`
    text-align: center;
    font-size: 3em;
    padding-top: 15px;
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
        font-variation-settings: "wght" 600;
        color: ${COLOR.primary};
    }

    & p {
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
        width: 40%;
        height: auto;
        color : ${ COLOR.primary};
    }
`;