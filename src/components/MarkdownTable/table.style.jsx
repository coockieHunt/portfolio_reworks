import styled from 'styled-components';

import { HexToRgbaConverter } from '@/utils/HexToRgbaConverter';
import { SCREEN_SIZE } from '@/config';

export const TableWrapper = styled.div`
    width: 100%;
    margin: 40px 0;

    @media (max-width: ${SCREEN_SIZE.tablet}) {
        overflow-x: auto;
        white-space: nowrap;

        &::-webkit-scrollbar {
            height: 8px;
        }
        &::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 4px;
        }
        &::-webkit-scrollbar-thumb {
            background: ${HexToRgbaConverter('var(--primary)', 0.3)};
            border-radius: 4px;
            cursor: pointer;
        }
        &::-webkit-scrollbar-thumb:hover {
            background: ${HexToRgbaConverter('var(--primary)', 0.5)};
        }
    }
`;

export const StyledTable = styled.table`
    width: 100%;
    display: table;
    white-space: normal;
    border-collapse: collapse;
    border: none;

    & thead {
        border-bottom: 2px solid var(--primary);
    }

    & th {
        font-weight: 600;
        text-align: left;
        padding: 14px 16px;
        border: none;
        font-size: 0.9rem;
        letter-spacing: 0.5px;
        color: var(--primary);
        background: transparent;
    }

    & tbody tr {
        border-bottom: 1px solid ${HexToRgbaConverter('var(--primary)', 0.15)};
        transition: background-color 0.2s ease;
    }

    & tbody tr:last-child {
        border-bottom: none;
    }

    & tbody tr:hover {
        background-color: rgba(255, 255, 255, 0.02);
    }

    & td {
        padding: 14px 16px;
        border: none;
        line-height: 1.6;
        font-size: 0.95rem;
    }

    & td:first-child {
        font-weight: 500;
    }
`;
