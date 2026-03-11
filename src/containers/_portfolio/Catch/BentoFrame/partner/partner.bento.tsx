import * as Styled from "./partner.style";
import {
    animate,
    motion,
    useMotionValueEvent,
    useMotionTemplate,
    useMotionValue,
    useSpring,
    useTransform,
    type MotionValue,
} from "framer-motion";
import {
     BentoLabelComponent, 
     BentoStateDotComponent, 
     BentoCardProps, 
     BentoActionComponent, 
     BentoWaveLayerComponent, 
     BENTO_SPRING 
} from '@/components/Bento/Bento.component';
import { useRef, useState, useEffect, useCallback } from "react";
import { COLOR_SETTING } from '@/config';
import { useSettingContext } from '@/context/Setting.context';
import { RefreshCcw, Hash } from 'lucide-react';

type CursorMotion = MotionValue<number> | number;
const MAGNET_RADIUS = 150;
const MIN_DISTANCE = 100;
const SYNC_THRESHOLD = 120;
const SYNCED_PHASE = 1.9;
const WAVE_INTENSE_DURATION = 1200;
const SYNC_TIME_MS = 3200; 
const STATIC_CURSOR_POS = {
    meX: 0.35,
    meY: 0.45,
    youX: 0.65,
    youY: 0.55,
} as const;

interface CursorProps {
    x: CursorMotion;
    y: CursorMotion;
    scale?: CursorMotion;
    color: string;
    colorBorder: string;
    className?: string;
    label: string;
    visible?: boolean;
    wave?: boolean;
    waveIntense?: boolean;
}

const Cursor = ({ 
    x, y, scale = 1,
    color, colorBorder, className = '', label,
    visible = true, wave = false, waveIntense = false
}: CursorProps) => (
    <motion.div
        className={`cursor ${className}`.trim()}
        style={{ 
            x, y, scale,
            translateX: '-50%',
            translateY: '-50%',
            opacity: visible ? 1 : 0,
            '--cursor-wave-color': color 
        } as any}
    >
        {wave && <BentoWaveLayerComponent className={waveIntense ? 'bento-wave-intense' : ''} />}
        <svg 
            width="24" height="24" viewBox="0 0 24 24"
            style={{ position: 'absolute', top: -3, left: -5 }}
        >
            <path fill={color} stroke={colorBorder} strokeWidth="1"
                d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z"
            />
        </svg>
        <span className="label font_code">{label}</span>
    </motion.div>
);

export const PartnerBentoComponent = ({ BorderColor, SizeCard, isMobile }: BentoCardProps) => {
    const { settings } = useSettingContext();
    const isReducedMotion = settings.reducedMotion;
    const currentTheme = settings?.theme || 'dark';
    const themeColor = COLOR_SETTING[currentTheme];
    const primaryColor = themeColor.primary || '#4a90e2';
    const secondaryColor = themeColor.secondary || '#50e3c2';
    const borderLightColor = themeColor.border_light || '#d8d8d8';

    const youX = useMotionValue(120);
    const youY = useMotionValue(150);
    const meX = useMotionValue(160);
    const meY = useMotionValue(120);
    const distCursor = useMotionValue(400);
    const LineStroke = useMotionValue(2.5);
    const syncProgress = useMotionValue(0); 
    
    const globalScale = useSpring(1, BENTO_SPRING.mid);

    const meXSmooth = useSpring(meX, BENTO_SPRING.smooth);
    const meYSmooth = useSpring(meY, BENTO_SPRING.smooth);

    const partnerRef = useRef<HTMLDivElement | null>(null);
    const partnerAreaRef = useRef({ width: 320, height: 240 });
    const mePosition = useRef({ x: 160, y: 120 });
    const requestRef = useRef<number | undefined>(undefined);
    const isPartnerHoverRef = useRef(false);
    const isCompletedRef = useRef(false);
    const awaitHoverRearmRef = useRef(false);

    const [isPartnerHover, setIsPartnerHover] = useState(false);
    const [isWaveIntense, setIsWaveIntense] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const displayCompleted = isMobile || isCompleted;
    const [awaitHoverRearm, setAwaitHoverRearm] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        isPartnerHoverRef.current = isPartnerHover;
        isCompletedRef.current = displayCompleted;
        awaitHoverRearmRef.current = awaitHoverRearm;
    }, [isPartnerHover, displayCompleted, awaitHoverRearm]);

    const lineOpacity = useTransform(distCursor, [700, 350, 80], [0.12, 0.24, 0.62]);
    const syncOpacity = useTransform(distCursor, [250, 60], [0.4, 1]);
    const disablePartnerEffects = isReducedMotion;

    const meMaskX = useMotionTemplate`${meXSmooth}px`;
    const meMaskY = useMotionTemplate`${meYSmooth}px`;
    const youMaskX = useMotionTemplate`${youX}px`;
    const youMaskY = useMotionTemplate`${youY}px`;

    useMotionValueEvent(syncProgress, 'change', (latest) => {
        if (isCompletedRef.current) {
            setIsSyncing(false);
            return;
        }
        setIsSyncing(latest > 0.02);
    });

    const showYouCursor = isPartnerHover || displayCompleted;
    const hideCustomCursor = displayCompleted || awaitHoverRearm;

    const resetMeToCenter = useCallback(() => {
        const centerX = partnerAreaRef.current.width / 2;
        const centerY = partnerAreaRef.current.height / 2;
        mePosition.current = { x: centerX, y: centerY };
        meX.set(centerX);
        meY.set(centerY);
    }, [meX, meY]);

    const setStaticCursorPositions = useCallback((width: number, height: number) => {
        const staticMeX = width * STATIC_CURSOR_POS.meX;
        const staticMeY = height * STATIC_CURSOR_POS.meY;
        const staticYouX = width * STATIC_CURSOR_POS.youX;
        const staticYouY = height * STATIC_CURSOR_POS.youY;

        meX.set(staticMeX);
        meY.set(staticMeY);
        youX.set(staticYouX);
        youY.set(staticYouY);
        distCursor.set(Math.hypot(staticMeX - staticYouX, staticMeY - staticYouY));
    }, [distCursor, meX, meY, youX, youY]);

    const handlePartnerMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        partnerAreaRef.current = { width: rect.width, height: rect.height };
        if (isCompletedRef.current || awaitHoverRearmRef.current) return;
        youX.set(event.clientX - rect.left);
        youY.set(event.clientY - rect.top);
    }, [youX, youY]);

    const animateMe = (timestamp: number) => {
        const { width, height } = partnerAreaRef.current;
        const margin = 40;
        const pos = mePosition.current;
        const centerX = width / 2;
        const centerY = height / 2;

        const t = timestamp * 0.001;
        const ampX = Math.max(26, Math.min(76, (width - margin * 2) * 0.34));
        const ampY = Math.max(20, Math.min(56, (height - margin * 2) * 0.3));

        let targetX = centerX + ampX * Math.sin(t * 0.9) + ampX * 0.22 * Math.sin(t * 2.1 + 0.8);
        let targetY = centerY + ampY * Math.cos(t * 0.75) + ampY * 0.2 * Math.sin(t * 1.7);

        const currentYouX = youX.get();
        const currentYouY = youY.get();
        const dx = pos.x - currentYouX;
        const dy = pos.y - currentYouY;
        const d = Math.hypot(dx, dy);
        const safeDistance = Math.max(d, 0.0001);

        if (isPartnerHoverRef.current && !isCompletedRef.current && !awaitHoverRearmRef.current) {
            if (d < MIN_DISTANCE) {
                const repel = (1 - d / MIN_DISTANCE) * 45;
                targetX += (dx / safeDistance) * repel;
                targetY += (dy / safeDistance) * repel;
            } 
            else if (d < MAGNET_RADIUS) {
                const attract = (1 - d / MAGNET_RADIUS) * 12;
                targetX += ((currentYouX - pos.x) / safeDistance) * attract;
                targetY += ((currentYouY - pos.y) / safeDistance) * attract;
            }

            if (d <= SYNC_THRESHOLD) {
                const progress = Math.min(syncProgress.get() + (16 / SYNC_TIME_MS), 1);
                syncProgress.set(progress);
                if (progress >= 1) {
                    setIsCompleted(true);
                    syncProgress.set(0);
                }
            } else {
                syncProgress.set(Math.max(syncProgress.get() - 0.04, 0));
            }
        }

        targetX = Math.min(width - margin, Math.max(margin, targetX));
        targetY = Math.min(height - margin, Math.max(margin, targetY));

        pos.x += (targetX - pos.x) * 0.085;
        pos.y += (targetY - pos.y) * 0.085;
        meX.set(pos.x);
        meY.set(pos.y);

        if (isCompletedRef.current) {
            const syncedYouX = Math.min(width - margin, Math.max(margin, centerX + ampX * 0.9 * Math.sin(t * 1.05 + SYNCED_PHASE) + ampX * 0.16 * Math.sin(t * 2.5 + 0.3)));
            const syncedYouY = Math.min(height - margin, Math.max(margin, centerY + ampY * 0.95 * Math.cos(t * 0.82 + SYNCED_PHASE) + ampY * 0.22 * Math.sin(t * 1.35 + 2.1)));
            youX.set(syncedYouX);
            youY.set(syncedYouY);
            distCursor.set(Math.hypot(pos.x - syncedYouX, pos.y - syncedYouY));
        } else {
            distCursor.set(d);
        }

        requestRef.current = requestAnimationFrame(animateMe);
    };

    useEffect(() => {
        if (partnerRef.current) {
            const rect = partnerRef.current.getBoundingClientRect();
            partnerAreaRef.current = { width: rect.width, height: rect.height };
        }

        if (isMobile) {
            const { width, height } = partnerAreaRef.current;
            setStaticCursorPositions(width, height);
            return;
        }

        resetMeToCenter();
        requestRef.current = requestAnimationFrame(animateMe);
        return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
    }, [isMobile, resetMeToCenter, setStaticCursorPositions]);

    const handleReset = useCallback(() => {
        setIsCompleted(false);
        setIsPartnerHover(false);
        setIsSyncing(false);
        syncProgress.set(0);
        setAwaitHoverRearm(true);
    }, [syncProgress]);

    const handleMouseEnter = useCallback(() => {
        if (!awaitHoverRearmRef.current) {
            setIsPartnerHover(true);
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsPartnerHover(false);
        setIsSyncing(false);
        syncProgress.set(0);
        if (awaitHoverRearmRef.current) {
            setAwaitHoverRearm(false);
        }
    }, [syncProgress]);

    const handleCardClick = useCallback(() => {
        setIsWaveIntense(true);
        animate(LineStroke, 3.2, {
            type: 'spring',
            stiffness: 800,
            damping: 10,
            onComplete: () => animate(LineStroke, 2.5, { duration: 1 }),
        });
        setTimeout(() => setIsWaveIntense(false), WAVE_INTENSE_DURATION);
    }, [LineStroke]);

    const cardStyle = {
        cursor: hideCustomCursor || isMobile ? 'default' : 'none',
        touchAction: isMobile ? 'auto' : undefined,
    };

    return (
        <Styled.Partner
            BorderColor={BorderColor}
            ref={partnerRef}
            SizeCard={SizeCard}
            className='partner reduce-motion-component'
            style={cardStyle}
            onMouseMove={isMobile ? undefined : handlePartnerMouseMove}
            onMouseEnter={isMobile ? undefined : handleMouseEnter}
            onMouseLeave={isMobile ? undefined : handleMouseLeave}
            onClick={isMobile ? undefined : handleCardClick}
        >
            {!isMobile && (
                <div className="head">
                     <BentoActionComponent
                        status={displayCompleted ? "reset" : "rules"}
                        icon={displayCompleted ? <RefreshCcw size={14} /> : <Hash size={14} />}
                        rulesText={"Synchronisée les curseur"}
                        onClick={displayCompleted ? handleReset : undefined}
                    />
                </div>
            )}

            <div className="frame">
                {!isMobile && !disablePartnerEffects && <motion.div className="dot-tint dot-tint-me" style={{ '--dot-color': `${primaryColor}2E`, '--mask-x': meMaskX, '--mask-y': meMaskY } as any} />}
                {!isMobile && !disablePartnerEffects && <motion.div className="dot-tint dot-tint-you" animate={{ opacity: showYouCursor ? 1 : 0 }} transition={{ duration: 0.18 }} style={{ '--dot-color': `${secondaryColor}2A`, '--mask-x': youMaskX, '--mask-y': youMaskY } as any} />}

                {!displayCompleted && isSyncing && (
                    <div className="sync-progress-track" aria-hidden="true">
                        <motion.span
                            className="sync-progress"
                            style={{
                                opacity: syncOpacity,
                                scaleX: syncProgress,
                            }}
                        />
                    </div>
                )}

                <svg xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none", zIndex: 1 }}>
                    <motion.line
                        x1={meXSmooth} y1={meYSmooth} x2={youX} y2={youY}
                        stroke={primaryColor} strokeWidth={LineStroke} strokeDasharray="4 6"
                        strokeOpacity={lineOpacity} animate={{ opacity: showYouCursor ? 1 : 0 }}
                        style={{ animation: isReducedMotion ? 'none' : 'partnerLink 2s linear infinite' }}
                    />
                </svg>

                <Cursor x={meXSmooth} y={meYSmooth} scale={globalScale} color={primaryColor} colorBorder={borderLightColor} className="cursor-me" label="Moi" wave={!isMobile && !disablePartnerEffects && isPartnerHover} waveIntense={!isMobile && !disablePartnerEffects && isWaveIntense} />
                <Cursor x={youX} y={youY} scale={globalScale} color={secondaryColor} colorBorder={borderLightColor} className="cursor-you" label="Vous" visible={showYouCursor} wave={!isMobile && !disablePartnerEffects && showYouCursor} waveIntense={!isMobile && !disablePartnerEffects && isWaveIntense} />
            </div>

            <div className="footer">
                <BentoStateDotComponent status={isMobile ? "mobile" : displayCompleted ? "completed" : "idle"} />
                <BentoLabelComponent>
                    {displayCompleted ? 'Synchronisation active' : isSyncing ? 'Sync en cours...' : 'Partenaire impliquee'}
                </BentoLabelComponent>
            </div>
        </Styled.Partner>
    );
};