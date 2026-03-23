import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as Styled from '../Carousel/carousel.style';

type ControlsProps = {
    onPrev: () => void;
    onNext: () => void;
    isPrevDisabled: boolean;
    isNextDisabled: boolean;
    pageCount: number;
    activePage: number;
    size?: 'sm' | 'md' | 'lg' | number;
    indicatorType?: 'dash' | 'number';
};

const SIZE_MAP = {
    sm: 22,
    md: 30,
    lg: 38,
} as const;

export const ControlsComponent = ({
    onPrev,
    onNext,
    isPrevDisabled,
    isNextDisabled,
    pageCount,
    activePage,
    size = 'md',
    indicatorType = 'dash',
}: ControlsProps) => {
    const resolvedSize = typeof size === 'number' ? size : SIZE_MAP[size];
    const indicatorFontSize =
        indicatorType === 'dash'
            ? Math.max(16, Math.round(resolvedSize * 0.68))
            : Math.max(14, Math.round(resolvedSize * 0.58));
    const indicatorsGap =
        indicatorType === 'number'
            ? Math.max(8, Math.round(resolvedSize * 0.28))
            : 2;
    const indicatorText = (index: number) =>
        indicatorType === 'number' ? String(index + 1) : '-';

    return (
        <Styled.Controls style={{ gap: Math.max(2, Math.round(resolvedSize * 0.14)) }}>
            <Styled.PrevButton
                onClick={onPrev}
                disabled={isPrevDisabled}
                aria-label="Défiler vers la gauche"
                type="button"
                style={{ padding: Math.max(2, Math.round(resolvedSize * 0.12)) }}
            >
                <ChevronLeft size={resolvedSize} aria-hidden="true" focusable={false} />
            </Styled.PrevButton>

            <Styled.Indicators
                aria-hidden="true"
                style={{
                    minWidth: indicatorType === 'number' ? Math.max(42, resolvedSize * 2) : 36,
                    gap: indicatorsGap,
                }}
            >
                {Array.from({ length: pageCount }).map((_, index) => (
                    <Styled.Indicator
                        key={index}
                        $active={index === activePage}
                        style={{ fontSize: `${indicatorFontSize}px` }}
                    >
                        {indicatorText(index)}
                    </Styled.Indicator>
                ))}
            </Styled.Indicators>

            <Styled.NextButton
                onClick={onNext}
                disabled={isNextDisabled}
                aria-label="Défiler vers la droite"
                type="button"
                style={{ padding: Math.max(2, Math.round(resolvedSize * 0.12)) }}
            >
                <ChevronRight size={resolvedSize} aria-hidden="true" focusable={false} />
            </Styled.NextButton>
        </Styled.Controls>
    );
};
