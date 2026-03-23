import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import * as Styled from './CreativeWay.style';
import { BentoActionComponent, BentoCardProps, BentoLabelComponent, BentoStateDotComponent, BentoWaveLayerComponent, BENTO_SPRING } from '@/components/Bento/Bento.component';
import { FlagIcon, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSettingContext } from '@/context/Setting.context';

const MotionWPPatch = motion.create(Styled.WPPatch);
type Waypoint = { z: number; x: number };

const WAYPOINTS: Waypoint[] = [
    { x: 10, z: 45 }, 
    { x: 30, z: 50 }, 
    { x: 50, z: 60 }, 
    { x: 70, z: 50 }, 
    { x: 90, z: 45 }, 
];

const START_POINT = WAYPOINTS[0];
const LAST_POINT = WAYPOINTS[WAYPOINTS.length - 1];
const LAST_INDEX = WAYPOINTS.length - 1;
const ACTIVATION_RADIUS = 3;
const CONNECT_RADIUS = 7;
const PATH_DATA = WAYPOINTS.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.z}`).join(' ');
const DIRECT_PATH_DATA = `M ${START_POINT.x} ${START_POINT.z} L ${LAST_POINT.x} ${LAST_POINT.z}`;

export const CreativeWayBentoComponent = ({ SizeCard, isMobile }: BentoCardProps) => {
    const { settings } = useSettingContext();
    const isReducedMotion = settings.reducedMotion;
    const [enabledWaypoints, setEnabledWaypoints] = useState<number[]>([]);
    const [isDraggingFromStart, setIsDraggingFromStart] = useState(false);
    const [dragPoint, setDragPoint] = useState<{ x: number; z: number } | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const displayCompleted = isMobile || isCompleted;
    const enabledWaypointsRef = useRef<Set<number>>(new Set());
    const lastWaypointRef = useRef<number | null>(null);
    const frameRef = useRef<HTMLDivElement | null>(null);
    const dragPointRef = useRef<{ x: number; z: number } | null>(null);
    const isCompletedRef = useRef(false);
    const enabledWaypointSet = useMemo(() => new Set(enabledWaypoints), [enabledWaypoints]);

    useEffect(() => { isCompletedRef.current = isCompleted; }, [isCompleted]);

    const setDragPointState = useCallback((point: { x: number; z: number } | null) => {
        dragPointRef.current = point;
        setDragPoint(point);
    }, []);

    const toPercentPosition = useCallback((clientX: number, clientY: number) => {
        if (!frameRef.current) return null;
        const rect = frameRef.current.getBoundingClientRect();
        if (!rect.width || !rect.height) return null;

        const x = ((clientX - rect.left) / rect.width) * 100;
        const z = ((clientY - rect.top) / rect.height) * 100;

        return {
            x: Math.max(0, Math.min(100, x)),
            z: Math.max(0, Math.min(100, z)),
        };
    }, []);

    const resetDragLine = useCallback(() => {
        setIsDraggingFromStart(false);
        setDragPointState(null);
    }, [setDragPointState]);

    const handleReset = useCallback(() => {
        resetDragLine();
        setIsCompleted(false);
        enabledWaypointsRef.current = new Set();
        lastWaypointRef.current = null;
        setEnabledWaypoints([]);
    }, [resetDragLine]);

    const handleDotUpdate = useCallback((latest: { left?: number | string; top?: number | string }) => {
        if (isCompletedRef.current) return;

        if (latest.left === undefined || latest.top === undefined) return;

        const left = typeof latest.left === 'number' ? latest.left : parseFloat(latest.left);
        const top = typeof latest.top === 'number' ? latest.top : parseFloat(latest.top);

        if (Number.isNaN(left) || Number.isNaN(top)) return;

        let nextActive: number | null = null;
        WAYPOINTS.forEach((point, index) => {
            const distance = Math.hypot(left - point.x, top - point.z);
            if (distance <= ACTIVATION_RADIUS) {
                nextActive = index;
            }
        });

        if (nextActive === null) return;

        const previous = lastWaypointRef.current;
        if (previous !== null && nextActive < previous) {
            enabledWaypointsRef.current = new Set();
        }

        lastWaypointRef.current = nextActive;

        if (!enabledWaypointsRef.current.has(nextActive)) {
            enabledWaypointsRef.current.add(nextActive);
            setEnabledWaypoints(Array.from(enabledWaypointsRef.current));
        }
    }, []);

    useEffect(() => {
        if (!isDraggingFromStart) return;

        const handleMouseMove = (event: MouseEvent) => {
            const next = toPercentPosition(event.clientX, event.clientY);
            if (!next) return;
            setDragPointState(next);
        };

        const handleMouseUp = () => {
            const point = dragPointRef.current;
            const connected = !!point && Math.hypot(point.x - LAST_POINT.x, point.z - LAST_POINT.z) <= CONNECT_RADIUS;

            if (connected) {
                setIsCompleted(true);
                setEnabledWaypoints([]);
                enabledWaypointsRef.current = new Set();
                lastWaypointRef.current = null;
            }

            resetDragLine();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDraggingFromStart]);

    const isConnectedToEnd = !!dragPoint && Math.hypot(dragPoint.x - LAST_POINT.x, dragPoint.z - LAST_POINT.z) <= CONNECT_RADIUS;
    const dragLineEnd = isConnectedToEnd
        ? { x: LAST_POINT.x, z: LAST_POINT.z }
        : dragPoint;

    return (
        <Styled.CreativeWay className="reduce-motion-component" SizeCard={SizeCard}>
            {!isMobile && (
                <div className="head">
                    <BentoActionComponent
                        status={displayCompleted ? "reset" : "rules"}
                        icon={displayCompleted ? <RefreshCcw size={14} /> : <FlagIcon size={14} />}
                        rulesText={"Chercher le chemin le plus court"}
                        onClick={displayCompleted ? handleReset : undefined}
                    />
                </div>
            )}

            <div className="frame" ref={frameRef}>
                <div className="centered">
                    <svg 
                        viewBox="0 0 100 100" 
                        preserveAspectRatio="none"
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
                    >
                        <path
                            d={PATH_DATA}
                            fill="none"
                            stroke="var(--secondary)"
                            strokeWidth="0.5"
                            strokeDasharray="1 2"
                            opacity="0.3"
                        />

                        {(displayCompleted || (isDraggingFromStart && dragLineEnd)) && (
                            <path
                                d={displayCompleted ? DIRECT_PATH_DATA : `M ${START_POINT.x} ${START_POINT.z} L ${dragLineEnd!.x} ${dragLineEnd!.z}`}
                                fill="none"
                                stroke="var(--primary)"
                                strokeWidth="0.5"
                                strokeDasharray="1 2"
                                opacity={displayCompleted || isConnectedToEnd ? 1 : 0.75}
                            />
                        )}
                    </svg>

                    <motion.div
                        style={{
                            position: 'absolute',
                            width: '6px',
                            height: '6px',
                            marginLeft: '-3px',
                            marginTop: '-3px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary)',
                            zIndex: 3,
                        }}
                        onUpdate={handleDotUpdate}
                        animate={{
                            left: displayCompleted
                                ? [`${START_POINT.x}%`, `${LAST_POINT.x}%`]
                                : WAYPOINTS.map((p) => `${p.x}%`),
                            top: displayCompleted
                                ? [`${START_POINT.z}%`, `${LAST_POINT.z}%`]
                                : WAYPOINTS.map((p) => `${p.z}%`),
                            opacity: displayCompleted ? [0.35, 1, 0.35] : [0.3, 1, 1, 0.3],
                        }}
                        transition={{
                            duration: displayCompleted ? 2.4 : 6,
                            ease: 'linear',
                            repeat: isReducedMotion ? 0 : Infinity,
                            times: displayCompleted ? [0, 0.5, 1] : [0, 0.1, 0.9, 1],
                        }}
                    />

                    <div className="patch-container" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                        {WAYPOINTS.map((pos, index) => {
                            const isStartOrEnd = index === 0 || index === LAST_INDEX;
                            const isEnabled = displayCompleted
                                ? isStartOrEnd
                                : enabledWaypointSet.has(index);
                            const waypointScale = displayCompleted && isStartOrEnd
                                ? 1.6
                                : isEnabled
                                    ? 1.4
                                    : 1;
                            const isStart = index === 0;
                            return (
                                <div key={index}>
                                    {isStartOrEnd ? (
                                        <>
                                            <motion.div>
                                                <span style={{
                                                    position: 'absolute',
                                                    top: `calc(${pos.z}% + 20px)`,
                                                    left: `calc(${pos.x}% - 20px)`,
                                                    fontSize: '0.8em',
                                                    color: 'var(--primary)',
                                                    fontWeight: '500',
                                                }}>
                                                    {index === 0 ? "Départ" : "Arrivée"}
                                                </span>
                                            </motion.div>   

                                        

                                        </>
                                    ) : null}

                                    <MotionWPPatch 
                                        z={pos.z} 
                                        x={pos.x}
                                        initial={false}
                                        className={`${(index === 0 || index === LAST_INDEX) ? "waved" : ""}`}
                                        onMouseDown={(event) => {
                                            if (!isStart || displayCompleted) return;
                                            event.preventDefault();
                                            const start = toPercentPosition(event.clientX, event.clientY);
                                            if (!start) return;
                                            setDragPointState(start);
                                            setIsDraggingFromStart(true);
                                        }}
                                        style={{
                                            cursor: isStart ? 'grab' : 'default'
                                        }}
                                        animate={{
                                            scale: waypointScale,
                                            backgroundColor: isEnabled ? 'var(--primary)' : 'rgb(143, 142, 142)',
                                        }}
                                        transition={BENTO_SPRING.mid}
                                    >
                                    {isStartOrEnd && (
                                        <BentoWaveLayerComponent />
                                    )}
                                    </MotionWPPatch>
                                </div>
                            );
                        })}
                    </div>
                </div>
               
            </div>

            <div className="footer">
                <BentoStateDotComponent status={isMobile ? "mobile" : displayCompleted ? "completed" : "idle"} />
                <BentoLabelComponent>Routes creatives</BentoLabelComponent>
            </div>
        </Styled.CreativeWay>
    );
};