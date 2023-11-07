import styled from "styled-components";
import { COLOR } from "../config";

export const Card = styled.div`
    background-color: ${COLOR.secondary_background};
    display: flex;
    justify-content: space-around;
    gap: 15px;
    border-radius: 10px;

    & .Column {
        flex-grow: 1;
        padding: 10px;
    }
`
