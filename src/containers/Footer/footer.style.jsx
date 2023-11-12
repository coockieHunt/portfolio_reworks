import styled from "styled-components";
import { SCREEN_SIZE } from "../../config";

export const Container = styled.div`
   overflow-x: hidden;
   overflow-Y: hidden;
`;

export const Block = styled.div`
    padding: 10px;
    text-align: center;
`;

export const Header = styled.div`
    background-color: #202020;;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    color: white;
    margin-top: 20px;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        flex-direction: column;
        align-items: center;
    }
`;

