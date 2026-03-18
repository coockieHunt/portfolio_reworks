import { FC, useEffect, useMemo, useRef } from 'react';
import { useAnimationFrame, useMotionValue, useSpring } from 'framer-motion';
import * as Styled from './Stack.style';
import { StackList, iStackItem } from '@/config';



interface BuildStackProps {
    data: iStackItem;
}

const BuildStack: FC<BuildStackProps> = ({ data }) => {
    const Icon = data.icon;

    return (
        <Styled.Stack $iconSize={data.width} $iconColor={data.color}>
            <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
            >
                <Icon 
                    width= {data.width}
                    height={data.width} 
                    style={{ color: data.color, fill: 'currentColor' }} 
                    className="icon"
                />
                <h3>{data.name}</h3>
            </a>
        </Styled.Stack>
    );
};

export const StackContainer: FC = () => {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const x = useMotionValue(0);


    const DUPLICATE_COUNT = 4;
    const SPEED = 90;
    const HOVER_SPEED = 45;

    const speed = useMotionValue(SPEED);
    const smoothSpeed = useSpring(speed, {
        damping: 22,
        stiffness: 120,
        mass: 0.4,
    });
    const infiniteStack = useMemo(() => Array(DUPLICATE_COUNT).fill(StackList).flat(), []);
    const loopWidth = useRef(0);

    useEffect(() => {
        const containerRef = trackRef.current;

        if (!containerRef) { return;}

        const updateWidth = () => {
            loopWidth.current = containerRef.scrollWidth / DUPLICATE_COUNT;

            if (loopWidth.current > 0 && x.get() <= -loopWidth.current) {
                x.set(x.get() % loopWidth.current);
            }
        };

        updateWidth();

        const observer = new ResizeObserver(updateWidth);
        observer.observe(containerRef);

        return () => {
            observer.disconnect();
        };
    }, [x]);

    useAnimationFrame((_, delta) => {
        const distance = (smoothSpeed.get() * delta) / 1000;
        const nextX = x.get() - distance;

        x.set(nextX <= -loopWidth.current ? nextX + loopWidth.current : nextX);
    });

    return (
        <Styled.Container>
            <Styled.Track
                ref={trackRef}
                style={{ x }}
                onHoverStart={() => speed.set(HOVER_SPEED)}
                onHoverEnd={() => speed.set(SPEED)}
            >
                {infiniteStack.map((item, index) => (
                    <BuildStack key={`${item.name}-${index}`} data={item} />
                ))}
            </Styled.Track>
        </Styled.Container>
    );
};