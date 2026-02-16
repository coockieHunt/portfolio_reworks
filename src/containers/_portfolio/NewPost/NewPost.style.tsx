import styled from "styled-components"
import { SCREEN_SIZE } from "@/config";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 85%;

    margin: 0 auto;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        width: 95%;
    }
`

export const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100%;
    padding: 20px 0;
`