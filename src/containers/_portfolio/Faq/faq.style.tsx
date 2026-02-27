import styled from "styled-components";
import { SCREEN_SIZE } from "@/config";

export const Container = styled.div`
    width: 80%;
    margin: 30px auto;

    display: flex;
    flex-direction: column;

    @media (max-width: ${SCREEN_SIZE.tablet}) {
        width: 90%;
    }
`;