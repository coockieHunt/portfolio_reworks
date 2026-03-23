import * as Styled from './BlackBox.style';
import { BentoActionComponent, BentoCardProps, BentoLabelComponent, BentoStateDotComponent, BentoWaveLayerComponent, BENTO_SPRING } from '@/components/Bento/Bento.component';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Target } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useSettingContext } from '@/context/Setting.context';

const RADIUS = 220;      
const TARGET_X = -60;    
const FOCUS_ZONE = 12;   
const DRAG_RANGE = 140;  

const IDLE_RANGE: [number, number] = [-80, 80];
const HOVER_SPRING = BENTO_SPRING.soft;
const BACK_TO_RANGE_SPRING = BENTO_SPRING.soft;
const SNAP_TO_TARGET_SPRING = BENTO_SPRING.snap;

export const BlackBoxBentoComponent = ({ SizeCard, isMobile }: BentoCardProps) => {
    const { settings } = useSettingContext();
    const isReducedMotion = settings.reducedMotion;
    const [isCompleted, setIsCompleted] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobilePointer, setIsMobilePointer] = useState(false);
    const displayCompleted = isMobile || isMobilePointer || isCompleted;

    const cursorX = useMotionValue(0); 

    const blurValue = useTransform(cursorX, 
        [TARGET_X - 100, TARGET_X, TARGET_X + 100], 
        [12, 0, 12]
    );
    const blurFilter = useTransform(blurValue, (v) => `blur(${Math.abs(v)}px)`);

    useEffect(() => {
        const media = window.matchMedia('(pointer: coarse), (max-width: 768px)');
        const update = () => setIsMobilePointer(media.matches);
        update();
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        if (isDragging || displayCompleted) return;

        if (isMobilePointer) {
            cursorX.set(0);
            return;
        }

        if (isReducedMotion && !isHovered) {
            cursorX.set(0);
            return;
        }

        const controls = isHovered
            ? animate(cursorX, DRAG_RANGE, HOVER_SPRING)
            : animate(cursorX, IDLE_RANGE, {
                duration: 5,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
            });

        return () => controls.stop();
    }, [isDragging, isHovered, displayCompleted, isMobilePointer, isReducedMotion, cursorX]);

    const handleMouseEnter = useCallback(() => {
        if (displayCompleted) return;
        setIsHovered(true);
    }, [displayCompleted]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, []);

    const handleDragEnd = useCallback(() => {
        setIsDragging(false);
        const currentPos = cursorX.get();
        if (Math.abs(currentPos - TARGET_X) <= FOCUS_ZONE) {
            setIsCompleted(true);
            animate(cursorX, TARGET_X, SNAP_TO_TARGET_SPRING);
        } else {
            animate(cursorX, DRAG_RANGE, BACK_TO_RANGE_SPRING);
        }
    }, [cursorX]);

    const handleReset = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDragging(false);
        setIsCompleted(false);
        cursorX.set(0);
    }, [cursorX]);

    const handleDragStart = useCallback(() => {
        setIsDragging(true);
    }, []);

    return (
        <Styled.BlackBox 
            className="reduce-motion-component"
            SizeCard={SizeCard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {!isMobile && (
                <div className="head">
                    <BentoActionComponent
                        status={displayCompleted ? 'reset' : 'rules'}
                        icon={displayCompleted ? <RefreshCcw size={14} /> : <Target size={14} />}
                        rulesText="Chercher le focus"
                        onClick={displayCompleted && !isMobilePointer ? handleReset : undefined}
                    />
                </div>
            )}

            <div className="frame">

                <motion.span
                    className="font_dot centerText"
                    style={{
                        filter: displayCompleted ? 'none' : blurFilter,
                        color: displayCompleted ? 'var(--primary)' : 'white',
                    }}
                >
                    Pédagogie
                </motion.span>

                <svg
                    className="orbit"
                    width="100%"
                    height="100%"
                >
                    <motion.circle
                        cx="50%"
                        cy="75%" 
                        r={RADIUS}
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="1.2"
                        strokeDasharray="8 12"
                        initial={{ opacity: 0.12 }}
                        animate={{ 
                            opacity: displayCompleted ? 0.05 : 0.2,
                        }}
                        transition={{ duration: 0.8 }}
                    />
                </svg>

                <AnimatePresence>
                    {!displayCompleted && (
                        <motion.div
                            key="focus-cursor"
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0, filter: "blur(8px)" }}
                            
                            whileDrag={{ 
                                opacity: 0.5, 
                                scale: 1.15,
                                transition: { duration: 0.1 } 
                            }}
                            
                            drag="x"
                            dragConstraints={{ left: -DRAG_RANGE, right: DRAG_RANGE }}
                            dragElastic={0.05}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            className="focusCursor"
                            style={{
                                x: cursorX,
                                cursor: isDragging ? 'grabbing' : 'grab',
                            }}
                        >
                            {isHovered && <BentoWaveLayerComponent />}
                            <div className="focusCursorDot" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="footer">
                <BentoStateDotComponent status={isMobile ? "mobile" : displayCompleted ? "completed" : "idle"} />
                <BentoLabelComponent>Pédagogie & Clarté</BentoLabelComponent>
            </div>
        </Styled.BlackBox>
    );
};