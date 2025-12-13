import React, { useState, useRef, useMemo } from "react";
import { useAnimationFrame, useMotionValue } from "framer-motion";
import { FaArrowsRotate } from "react-icons/fa6";

import { 
    FrameCubeScene, 
    FrameCubeContainer, 
    CubeGroup, 
    CubeUnitWrapper, 
    CubeFace 
} from "./FrameCube.style";

const CUBE_CONFIG = {
    offset: 70,     
    translateZ: 30,   
    rotSpeedX: 0.010,
    rotSpeedY: 0.015
};

const FACES_CONFIG = [
    { id: 'front', rotX: 0, rotY: 0 },
    { id: 'back', rotX: 180, rotY: 0 },
    { id: 'right', rotX: 0, rotY: 90 },
    { id: 'left', rotX: 0, rotY: -90 },
    { id: 'top', rotX: 90, rotY: 0 },
    { id: 'bottom', rotX: -90, rotY: 0 },
];

const GRID_POSITIONS: [number, number, number][] = [];
for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            GRID_POSITIONS.push([x, y, z]);
        }
    }
}

export interface FrameCubeProps {
    color?: string;
    hoverColor?: string;
}

interface SubCubeProps extends FrameCubeProps {
    position: [number, number, number];
}

const useFps = (enabled: boolean) => {
    const [fps, setFps] = useState(0);
    const frameCount = useRef(0);
    const lastTime = useRef(performance.now());

    useAnimationFrame((time) => {
        if (!enabled) return;
        
        frameCount.current++;
        const delta = time - lastTime.current;

        if (delta >= 1000) {
            setFps(Math.round((frameCount.current * 1000) / delta));
            frameCount.current = 0;
            lastTime.current = time;
        }
    });

    return fps;
};

const getFpsColor = (fps: number) => {
    if (fps > 45) return 'lightgreen';
    if (fps > 30) return 'yellow';
    return 'red';
};

const SubCube: React.FC<SubCubeProps> = ({ position, color = "#6366f1", hoverColor = "#a78bfa" }) => {
    const [isHovered, setHovered] = useState(false);
    
    const x = position[0] * CUBE_CONFIG.offset;
    const y = position[1] * CUBE_CONFIG.offset;
    const z = position[2] * CUBE_CONFIG.offset;

    const activeColor = isHovered ? hoverColor : color;

    return (
        <CubeUnitWrapper
            style={{ x, y, z }} 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            animate={{ scale: isHovered ? 0.90 : 1 }}
            transition={{ duration: 0.2 }}
        >
            {FACES_CONFIG.map((face) => (
                <CubeFace 
                    key={face.id}
                    $color={activeColor} 
                    $rotateX={face.rotX} 
                    $rotateY={face.rotY} 
                    $translateZ={CUBE_CONFIG.translateZ} 
                />
            ))}
        </CubeUnitWrapper>
    );
};


export const WireframeScene: React.FC<FrameCubeProps> = ({ color = "#4f46e5", hoverColor = "#ffffff" }) => {
    const [isRotating, setIsRotating] = useState(true);
    const fps = useFps(isRotating);

    const rotationX = useMotionValue(0);
    const rotationY = useMotionValue(0);

    useAnimationFrame((t, delta) => {
        if (!isRotating) return;
        rotationX.set(rotationX.get() + delta * CUBE_CONFIG.rotSpeedX);
        rotationY.set(rotationY.get() + delta * CUBE_CONFIG.rotSpeedY);
    });

    return (
        <FrameCubeScene>
            <FrameCubeContainer>
                <button
                    onClick={() => setIsRotating(!isRotating)}
                    aria-label={isRotating ? "Arrêter la rotation" : "Démarrer la rotation"}
                    style={{ cursor: 'pointer', background: 'none', border: 'none' }}
                >
                    <FaArrowsRotate style={{ color: isRotating ? '#4ade80' : '#f87171', fontSize: '1.2rem' }} />
                </button>
                
                <div style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                    <span>FPS: </span>
                    <span style={{ color: getFpsColor(fps), fontWeight: 'bold' }}>
                        {fps}
                    </span>
                </div>
            </FrameCubeContainer>

            <CubeGroup style={{ rotateX: rotationX, rotateY: rotationY }}>
                {GRID_POSITIONS.map((pos, index) => (
                    <SubCube 
                        key={`cube-${index}`} 
                        position={pos} 
                        color={color} 
                        hoverColor={hoverColor} 
                    />
                ))}
            </CubeGroup>
        </FrameCubeScene>
    );
};