import styled from "styled-components";

type SliderTrackProps = {
    $translateX: number;
};

type IndicatorProps = {
    $active: boolean;
};

export const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
`;

export const Viewport = styled.div`
    width: 100%;
    overflow-x: hidden;
    overflow-y: visible;
`;

export const SliderTrack = styled.div<SliderTrackProps>`
    display: flex;
    flex-direction: row;
    gap: 20px;
    height: auto;
    width: max-content;
    transition: transform 0.5s cubic-bezier(0.2, 0, 0.2, 1);

    transform: translateX(${({ $translateX }) => $translateX}px);

    & > * {
        flex-shrink: 0;
    }

    @media (max-width: 768px) {
        gap: 12px;
    }
`;

const BaseButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--font-subtle);
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    transition: color 0.2s ease, opacity 0.2s ease;
    
    &:disabled { 
        opacity: 0.35; 
        pointer-events: none; 
    }
    &:hover { color: var(--secondary); }
`;

export const Controls = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 100%;
    padding-top: 4px;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const PrevButton = styled(BaseButton)``;
export const NextButton = styled(BaseButton)``;

export const Indicators = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    min-width: 36px;
`;

export const Indicator = styled.span<IndicatorProps>`
    color: ${({ $active }) => ($active ? 'var(--primary)' : 'var(--font-subtle)')};
    opacity: ${({ $active }) => ($active ? 1 : 0.5)};
    font-size: 1.1rem;
    font-variation-settings: 'wght' ${({ $active }) => ($active ? 700 : 400)};
    user-select: none;
`;