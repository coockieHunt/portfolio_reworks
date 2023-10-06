import styled from "styled-components";
import { SCREEN_SIZE } from "../../config";

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    color: white;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        flex-direction: column;
        align-items: center;
    }
`;

export const Block = styled.div`
    padding: 10px;
    text-align: center;
`;

