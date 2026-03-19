import * as Styled from './ProcessTimelIne.style';
import { TitleTextComponent } from '@/components/Text/Text.component';
import { TimeLine } from '@/data';
import { ReactNode, useState } from 'react';

export interface IBackgroundSVGProps {
    strokeColor?: string;
    opacity?: number;
    className?: string;
}

const commitNodeVariants = {
    rest: {
        scale: 1,
        boxShadow: '0 0 10px color-mix(in srgb, var(--secondary), transparent 60%)',
    },
    hover: {
        scale: 1.3,
        boxShadow: '0 0 15px var(--primary)',
    },
};

const GitCommandStyle = (command: ReactNode) => {
    const GitColor = {
        green:  '#3fb950',
        red:    '#f78166',
        blue:   '#79c0ff',
        purple: '#d2a8ff',
        amber:  '#e3b341',
        gray:   '#6e7681',
    }

    const regex = /\*(\w+)\*\*(.*?)\*\*/g;
    if (typeof command === 'string') {
        return command.split(regex).map((part, index) => {
            if (index % 3 === 2) {
                const colorName = command.split(regex)[index - 1];
                const color = GitColor[colorName as keyof typeof GitColor] ?? '#79c0ff';
                return <span key={index} style={{ color }}>{part}</span>;
            }
            if (index % 3 === 1) return null;
            return part;
        });
    }
}


export const ProcessTimeLine = ({ id }) => {
    const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

    return (
        <Styled.Container id={id}>
            <BackgroundSVG strokeColor="var(--primary)" opacity={0.3} />

            <TitleTextComponent subtitle="Mon Workflow">
                Prêt pour l'aventure ?
            </TitleTextComponent>

            <Styled.WorkflowWrapper>
                <Styled.GitBranchLine
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{ originY: 0 }}
                    viewport={{once: true}}
                />

                {TimeLine.map((item, index) => (
                    <Styled.TimeLineItemContainer
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <Styled.CommitNode
                            variants={commitNodeVariants}
                            initial="rest"
                            animate={hoveredCardIndex === index ? 'hover' : 'rest'}
                            transition={{ type: "spring", stiffness: 300 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        />

                        <Styled.CardContent
                            onMouseEnter={() => setHoveredCardIndex(index)}
                            onMouseLeave={() => setHoveredCardIndex(null)}
                            onFocus={() => setHoveredCardIndex(index)}
                            onBlur={() => setHoveredCardIndex(null)}
                        >
                            <Styled.CardLeft>
                                <span className="git-command">{item.command}</span>
                                <Styled.TimeLineTitle className="font_code">
                                    <span className="num">0{index + 1}.</span>
                                    {item.title}
                                </Styled.TimeLineTitle>
                            </Styled.CardLeft>

                            <Styled.CardDivider />

                            <Styled.CardRight>
                                <Styled.TimeLineContent>
                                    <span className="gitOutput">
                                        <strong style={{ color: 'var(--primary)' }}>→ </strong> 
                                        {GitCommandStyle(item.content.git_output)}
                                    </span>
                                    <span className="describ">
                                        {item.content.description}
                                    </span>
                                </Styled.TimeLineContent>
                            </Styled.CardRight>
                        </Styled.CardContent>
                    </Styled.TimeLineItemContainer>
                ))}

            </Styled.WorkflowWrapper>
        </Styled.Container>
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