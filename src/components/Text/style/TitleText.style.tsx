import styled from 'styled-components';

export const TitleContainer = styled.div`
    position: relative;
    height: 100px;
    padding: 30px 0;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;

    left: 50%;
    transform: translate(-50%, 0);
    overflow: hidden;

    text-align: center;

    font-family: 'Doto Variable', sans-serif;
`;

export const Title = styled.h2`
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;

    display: inline-block;
    z-index: 9;
    font-variation-settings: 'wght' 500;
    color: var(--primary);
    font-size: 2.5rem;
    text-transform: uppercase;

    @media screen and (max-width: 768px) {
        font-size: 2em;
    }
`;

export const BackTitle = styled.span`
    display: inline-block;
    z-index: 2;

    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    text-align: center;

    font-variation-settings: 'wght' 700;
    font-size: 4.3em;
    color: #292929f8;
    text-transform: uppercase;

    @media screen and (max-width: 768px) {
        font-size: 2em;
        width: auto;
    }
`;
