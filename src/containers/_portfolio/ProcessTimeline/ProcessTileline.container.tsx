import React, { useEffect, useState, useRef } from 'react';

// Styles & Components
import {
    Container,
    TimeLineContainer,
    TimeLineItemContainer,
    TimeLineTitle,
    TimeLineContent,
} from './ProcessTileline.style';
import { TitleTextComponent } from '@/components/Text/Text.component';
import { DotGridEffect } from '@/styles/effect';

// Config & Context
import { TimeLine } from '@/data';

// type
export interface ITimeLineItemProps {
    step: number;
    title: string;
    content: string;
}

export interface IBackgroundSVGProps {
    strokeColor?: string;
    opacity?: number;
    className?: string;
}

interface ITimeLineData {
    title: string;
    content: string;
}

const TimeLineItem: React.FC<ITimeLineItemProps> = ({
    step,
    title,
    content,
}) => {
    return (
        <TimeLineItemContainer>
            <DotGridEffect
                $isHovered={true}
                $DotColor="#fafeff1d"
                $Spacing="18px"
                $DotSize="2px"
            />
            <TimeLineTitle className="font_code">
                <span>{step + 1}.</span> {title}
            </TimeLineTitle>
            <TimeLineContent>{content}</TimeLineContent>
            <div className="dot" />
        </TimeLineItemContainer>
    );
};

export const BackgroundSVG: React.FC<IBackgroundSVGProps> = ({
    strokeColor = 'rgb(253, 252, 253)',
    opacity = 0.12,
    className = '',
}) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            <defs>
                <filter id="neon-glow">
                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <circle
                cx="50"
                cy="50"
                r="70"
                stroke={strokeColor}
                strokeWidth="0.5"
                filter="url(#neon-glow)"
                opacity={opacity}
            >
                <animate
                    attributeName="r"
                    values="15; 15.5; 15"
                    dur="5s"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    );
};

export const ProcessTimeLine = ({ id }) => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const TRIGGER_THRESHOLD = 0.3;

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: TRIGGER_THRESHOLD },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <Container>
            <BackgroundSVG strokeColor="var(--primary)" opacity={0.3} />

            <TitleTextComponent subtitle="Vous êtes prêt">
                Prêt pour l'aventure ?
            </TitleTextComponent>

            <TimeLineContainer
                id={id}
                ref={containerRef}
                className={isVisible ? 'visible' : ''}
            >
                {TimeLine.map((item: ITimeLineData, index: number) => (
                    <TimeLineItem
                        key={`${item.title}-${index}`}
                        step={index}
                        title={item.title}
                        content={item.content}
                    />
                ))}
            </TimeLineContainer>
        </Container>
    );
};
