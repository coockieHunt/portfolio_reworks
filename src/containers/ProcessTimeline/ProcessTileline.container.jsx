import { useEffect, useState } from 'react';
import { Container, TimeLineContainer, TimeLineItemContainer, TimeLineTitle, TimeLineContent } from './ProcessTileline.style'; 
import { TitleTextComponent } from '../../components/Text/Text.component';
import { getColorSettings } from '../../config';
import { useSettingContext } from '../../context/Setting.context';
import { DotGridEffect } from '../../styles/effect.jsx';
import { TimeLine } from '../../data.jsx';

const TimeLineItem = ({ step, title, content }) => {
    return (
        <TimeLineItemContainer
            $initial={{ opacity: 0, y: 50 }} 
            $animate={{ opacity: 1, y: 0 }} 
            $transition={{ duration: 0.5 }} 
        >
            <DotGridEffect
                className='DotBg'
                $isHovered={true}
                dotColor="#fafeff14"
                spacing="18px"
                dotSize="2px"/>
            <TimeLineTitle className='font_code'><span>{step + 1}.</span> {title}</TimeLineTitle>
            <TimeLineContent>{content}</TimeLineContent>
            <div className="dot"/>
        </TimeLineItemContainer>
    )
};

export const BackgroundSVG = ({strokeColor = 'rgb(253, 252, 253)', opacity = 0.12}) => {
    return (
        <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                zIndex: -1, 
                transform: 'translate(-50%, -50%)' 
            }} 
        >
            <defs>
                <filter id="neon-glow">
                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>

            <circle 
                cx="50" 
                cy="50" 
                r="70" 
                stroke={strokeColor}
                strokeWidth="0.5" 
                stdDeviation="1"
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
}

export const ProcessTimeLine = ({ id }) => {
    const [isTimeLineVisible, setTimeLineVisible] = useState(false);
    const [hasBeenVisible, setHasBeenVisible] = useState(false);
    const {settings} = useSettingContext();

    const TrigerHeightAnimation = 0.3; // 30% of the element is visible
    useEffect(() => {
        const timelineElement = document.getElementById(id);
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasBeenVisible) {
                    setTimeLineVisible(true);
                    setHasBeenVisible(true);
                }
            },
            { threshold: TrigerHeightAnimation } 
        );
        
        if (timelineElement) {observer.observe(timelineElement);}
        return () => { timelineElement : observer.unobserve(timelineElement);};
    }, [id, hasBeenVisible]);

    return (
        <Container>
            <BackgroundSVG 
                strokeColor={getColorSettings(settings.theme).primary} 
                opacity={0.30} 
            />
            <TitleTextComponent subtitle={"Vous êtes prêt"}>
                Prêt pour l'aventure ?
            </TitleTextComponent>
            <TimeLineContainer id={id} className={isTimeLineVisible ? 'visible' : ''}>
                
                {TimeLine.map((item, index) => (
                    <TimeLineItem key={index} title={item.title} step={index} content={item.content} />
                ))}
            </TimeLineContainer>
        </Container>
    )
};
