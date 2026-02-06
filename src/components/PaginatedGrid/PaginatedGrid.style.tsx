import styled from 'styled-components';
import { SCREEN_SIZE } from '../../config.js';

export interface IGridContainerProps {
    $columns?: number;
    $rows?: number;
    $gap?: number;
}

export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    flex: 1;
`;

export const GridContainer = styled.div<IGridContainerProps>`
    display: grid;
    grid-template-columns: repeat(${(props) => props.$columns || 4}, 1fr);
    grid-template-rows: repeat(
        ${(props) => props.$rows || 2},
        1fr
    );
    gap: ${(props) => props.$gap || 10}px;
    width: 100%;
    height: 100%;

    justify-items: stretch;
    align-items: stretch;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: auto;
        height: auto;
    }
`;

export const PaginationContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin: 20px 0;

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
