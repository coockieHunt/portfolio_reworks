import styled from 'styled-components';
import { SCREEN_SIZE } from '../../config.js';

export interface IGridContainerProps {
    $gap?: number;
    $gapMobile?: number;
}

export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    flex: 1;
`;

export const GridContainer = styled.div<IGridContainerProps>`
    display: grid;
    /* On force 3 colonnes égales sur PC */
    grid-template-columns: repeat(3, 1fr); 
    gap: ${({ $gap }) => ($gap ?? 20)}px;
    width: 100%;

    /* Gestion Tablette (Optionnel mais conseillé si l'écran réduit un peu) */
    @media (max-width: 1100px) {
        grid-template-columns: repeat(2, 1fr); /* Passe à 2 colonnes sur écran moyen */
    }

    /* Gestion Mobile */
    @media (max-width: ${SCREEN_SIZE.mobile}) {
        grid-template-columns: 1fr; /* 1 seule colonne sur mobile */
        gap: ${({ $gapMobile, $gap }) => ($gapMobile ?? $gap ?? 20)}px;
    }
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-top: 20px;

    & span {
        font-size: 1.1em;
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.3s ease;
        padding: 5px 10px;

        &.active-page {
            font-weight: bold;
        }
    }
`;
