import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 20px 0;
    height: 80vh;
`

export const Form = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;

    & h2{
        font-size: 1.6em;
    }
    & form{
        height: auto;
    }
    gap: 20px;
`

export const Info = styled.div`
    height: 100%;
    width: 100%;

    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    font-size: 1.6vh;
    font-variation-settings: "wght" 400;


    & h3{
        font-size: 1.4vw;
        font-variation-settings: "wght" 500;

    }
`