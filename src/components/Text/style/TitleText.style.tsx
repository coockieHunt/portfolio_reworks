import styled from 'styled-components';

export const TitleContainer = styled.div`
    position: relative;
    min-height: 100px; 
    padding: 30px 0;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: normal;
    width: 100%;
    max-width: 100vw;
    overflow: hidden;
    text-align: center;
    font-family: 'Doto Variable', sans-serif;

    & .title {
        position: relative; 
        z-index: 9;
        width: 100%;
        margin: 0 auto;
        padding: 0 20px;
        display: block;
        
        /* Couleur de test (à ajuster selon ton besoin) */
        color: var(--primary);
        font-variation-settings: 'wght' 500;
        text-transform: uppercase;
        text-align: center;

        /* TITRE PRINCIPAL PLUS PETIT SUR DESKTOP */
        /* Mobile: 1.4rem | Desktop Max: 2.8rem */
        font-size: clamp(2rem, 3vw + 0.8rem, 2.8rem);

        overflow-wrap: break-word;
        white-space: normal; 
    }
`;

export const BackTitle = styled.span`
    position: absolute;
    left: 50%;
    top: 50%; 
    transform: translate(-50%, -50%);
    width: 100%;
    z-index: 2;
    display: block;

    font-variation-settings: 'wght' 700;
    text-transform: uppercase;
    color: #292929f8;
    text-align: center;
    line-height: 0.5;

    /* BACKTITLE PLUS PETIT SUR DESKTOP (à peine plus grand que le Title) */
    /* Mobile: 1.8rem | Desktop Max: 3.2rem */
    font-size: clamp(1.8rem, 3.5vw + 0.6rem, 2.7rem);
    
    user-select: none;
    pointer-events: none;
    white-space: normal;
    overflow-wrap: break-word;
    opacity: 0.5;
`;