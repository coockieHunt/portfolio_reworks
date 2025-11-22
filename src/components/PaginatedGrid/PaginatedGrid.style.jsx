import styled from 'styled-components';
import { SCREEN_SIZE, getColorSettings } from '../../config.jsx';

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.$columns || 4}, 1fr);
    grid-template-rows: repeat(${props => props.$rows || 2}, minmax(150px, 300px));
    gap: 10px;
    width: 100%;

    justify-items: stretch;
    align-items: stretch;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: auto;
        height: auto;
    }
`;

export const PaginationContainer = styled.div`
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-top: 20px;


    & button{
        padding: 10px 20px;
        font-size: 1em;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all .3s ease;

        background-color: ${props => getColorSettings(props.theme).background_secondary};

        &:disabled{
            background-color: ${props => getColorSettings(props.theme).background_secondary};
            cursor: not-allowed;
            opacity: 0.5;

        }

        &:hover:enabled{
            background-color: ${props => getColorSettings(props.theme).secondary};
        }
    }

    & span {
        font-size: 1.2em;
        cursor: pointer;
        padding: 5px 10px;
        border-radius: 5px;
        transition: all 0.3s ease;

        &:hover {
            transform: scale(1.1);
        }

        &.active-page {
            font-weight: bold;
        }
    }
`;
