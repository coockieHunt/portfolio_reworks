import styled from 'styled-components';
import { SCREEN_SIZE } from '../../config';

export const CubeParamsContainer = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 10;

    width: 210px;

    display: flex;
    flex-direction: column;
    gap: 12px;

    background-color: rgba(10, 10, 10, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

    & button {
        padding: 0;
        margin: 0;
        background: transparent;
        border: none;
        cursor: pointer;
        font-family: inherit;
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        display: none;
    }
`;

export const ControlRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
`;

export const ControlLabel = styled.span`
    font-weight: 500;
`;

export const ValueDisplay = styled.span<{ $color: string }>`
    color: ${(props) => props.$color};
    font-size: 0.75rem;
`;

export const SeparatorLine = styled.div`
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    width: 100%;
`;

export const ControlOption = styled.span<{
    $isActive: boolean;
    $activeColor: string;
}>`
    color: ${(props) => (props.$isActive ? props.$activeColor : '#555')};
    font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};
    transition: color 0.2s;
`;

export const Divider = styled.span`
    color: #444;
    margin: 0 6px;
    font-size: 0.7rem;
`;
