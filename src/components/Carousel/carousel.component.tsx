import React, { useState, useRef, useEffect } from 'react';
import * as Styled from './carousel.style';
import { ControlsComponent } from '../Controls/controls.component';

type CarouselProps = {
    children: React.ReactNode;
    itemsToScroll?: number;
    resetKey?: string | number;
};

type ScrollDirection = 'left' | 'right';

export const CarouselComponent = ({ children, itemsToScroll = 1, resetKey }: CarouselProps) => {
    const [translateX, setTranslateX] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const [scrollAmount, setScrollAmount] = useState(320 * Math.max(1, Math.floor(itemsToScroll)));
    
    const containerRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);

    const getScrollAmount = () => {
        if (!trackRef.current) {
            return 320 * Math.max(1, Math.floor(itemsToScroll));
        }

        const normalizedItemsToScroll = Math.max(1, Math.floor(itemsToScroll));
        const firstChild = trackRef.current.firstElementChild as HTMLElement | null;
        if (!firstChild) {
            return 320 * normalizedItemsToScroll;
        }

        const trackStyles = window.getComputedStyle(trackRef.current);
        const gapValue = trackStyles.columnGap || trackStyles.gap || '0';
        const gap = Number.parseFloat(gapValue) || 0;

        return (firstChild.offsetWidth + gap) * normalizedItemsToScroll;
    };

    useEffect(() => {
        const updateMetrics = () => {
            if (!containerRef.current || !trackRef.current) {
                return;
            }

            const containerWidth = containerRef.current.offsetWidth;
            const trackWidth = trackRef.current.scrollWidth;
            const limit = Math.max(trackWidth - containerWidth, 0);
            const nextScrollAmount = getScrollAmount();

            setMaxScroll(limit);
            setScrollAmount(nextScrollAmount);
            setTranslateX((prev) => Math.max(prev, -limit));
        };

        updateMetrics();
        window.addEventListener('resize', updateMetrics);
        return () => window.removeEventListener('resize', updateMetrics);
    }, [children, itemsToScroll]);

    useEffect(() => {
        setTranslateX(0);
        if (containerRef.current) {
            containerRef.current.scrollTo({ left: 0, top: 0, behavior: 'auto' });
        }
    }, [resetKey]);

    const pageCount = Math.max(1, Math.ceil(maxScroll / scrollAmount) + 1);
    const activePage = Math.min(pageCount - 1, Math.round(Math.abs(translateX) / scrollAmount));

    const handleScroll = (direction: ScrollDirection) => {
        const nextScrollAmount = scrollAmount;

        if (direction === 'left') {
            setTranslateX((prev) => Math.min(prev + nextScrollAmount, 0));
        } else {
            setTranslateX((prev) => Math.max(prev - nextScrollAmount, -maxScroll));
        }
    };

    return (
        <Styled.Container>
            <Styled.Viewport ref={containerRef}>
                <Styled.SliderTrack ref={trackRef} $translateX={translateX}>
                    {children}
                </Styled.SliderTrack>
            </Styled.Viewport>

            <ControlsComponent
                onPrev={() => handleScroll('left')}
                onNext={() => handleScroll('right')}
                isPrevDisabled={translateX === 0}
                isNextDisabled={translateX <= -maxScroll}
                pageCount={pageCount}
                activePage={activePage}
            />
        </Styled.Container>
    );
}