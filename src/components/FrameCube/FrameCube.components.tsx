import React, { useState, useMemo, memo } from "react";
import { useAnimationFrame, useMotionValue, Transition } from "framer-motion";

// style
import { 
    FrameCubeScene, 
    CubeGroup, 
    CubeUnitWrapper, 
    CubeFace,
    SliderOffset

} from "./FrameCube.style";

import {
    ControlRow,
    ControlLabel,
    ControlOption,
    ValueDisplay,
    SeparatorLine,
    Divider,
    CubeParamsContainer, 
} from "./Frame.ui.style";

// types
export interface FrameCubeProps {
    color?: string;
    hoverColor?: string;
}

interface SubCubeProps extends FrameCubeProps {
    position: [number, number, number];
    offset: number; 
    isSphere: boolean; 
}


// stacti config
const STATIC_CONFIG = {
    translateZ: 30,
    rotSpeedX: 0.010,
    rotSpeedY: 0.015,
    offsetRange: { minOffset: 70, maxOffset: 150 },
    springTransition: { type: "spring", mass: 0.5, stiffness: 150, damping: 15 } as Transition
};

// cube faces config
const FACES_CONFIG = [
    { id: 'front', rotX: 0, rotY: 0 },
    { id: 'back', rotX: 180, rotY: 0 },
    { id: 'right', rotX: 0, rotY: 90 },
    { id: 'left', rotX: 0, rotY: -90 },
    { id: 'top', rotX: 90, rotY: 0 },
    { id: 'bottom', rotX: -90, rotY: 0 },
];

// grid
const GRID_POSITIONS: [number, number, number][] = [];
for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            GRID_POSITIONS.push([x, y, z]);
        }
    }
}

// sub-cube component
const SubCube: React.FC<SubCubeProps> = memo(({ position, offset, isSphere, color = "#6366f1", hoverColor = "#a78bfa" }) => {
    const [isHovered, setHovered] = useState(false);
    
    const { normX, normY, normZ, sphereRotX, sphereRotY } = useMemo(() => {
        const dist = Math.sqrt(position[0]**2 + position[1]**2 + position[2]**2);
        const norm = dist === 0 ? 0 : 1 / dist;
        return {
            normX: position[0] * norm,
            normY: position[1] * norm,
            normZ: position[2] * norm,
            sphereRotX: position[0] * 45,
            sphereRotY: position[1] * 45
        };
    }, [position]);

    const radius = offset * 1.5;
    const targetX = isSphere ? normX * radius : position[0] * offset;
    const targetY = isSphere ? normY * radius : position[1] * offset;
    const targetZ = isSphere ? normZ * radius : position[2] * offset;
    const targetRotX = isSphere ? sphereRotX : 0;
    const targetRotY = isSphere ? sphereRotY : 0;
    const activeColor = isHovered ? hoverColor : color;

    return (
        <CubeUnitWrapper
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            animate={{ x: targetX, y: targetY, z: targetZ, rotateX: targetRotX, rotateY: targetRotY, scale: isHovered ? 0.90 : 1 }}
            transition={STATIC_CONFIG.springTransition}
        >
            {FACES_CONFIG.map((face) => (
                <CubeFace key={face.id} $color={activeColor} $rotateX={face.rotX} $rotateY={face.rotY} $translateZ={STATIC_CONFIG.translateZ} />
            ))}
        </CubeUnitWrapper>
    );
});

export const WireframeScene: React.FC<FrameCubeProps> = ({ color = "#4f46e5", hoverColor = "#ffffff" }) => {
    const [offset, setOffset] = useState(70);
    const [isRotating, setIsRotating] = useState(true);
    const [isSphere, setIsSphere] = useState(false); 
    
    const rotationX = useMotionValue(0);
    const rotationY = useMotionValue(0);

    useAnimationFrame((t, delta) => {
        if (!isRotating) return;
        rotationX.set(rotationX.get() + delta * STATIC_CONFIG.rotSpeedX);
        rotationY.set(rotationY.get() + delta * STATIC_CONFIG.rotSpeedY);
    });

    return (
        <FrameCubeScene>
            <CubeParamsContainer>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <ControlRow>
                        <ControlLabel>Expansion</ControlLabel>
                        <ValueDisplay $color={color}>{offset}%</ValueDisplay>
                    </ControlRow>
                    <SliderOffset 
                        type="range"
                        min={STATIC_CONFIG.offsetRange.minOffset}
                        max={STATIC_CONFIG.offsetRange.maxOffset}
                        value={offset} 
                        onChange={(e) => setOffset(Number(e.target.value))}
                        step={1}
                        color={color}
                        aria-label="Expansion"
                    />
                </div>

                <SeparatorLine />

                <ControlRow>
                    <ControlLabel>Rotation</ControlLabel>
                    <button onClick={() => setIsRotating(!isRotating)} aria-label="Toggle Rotation">
                        <ControlOption $isActive={isRotating} $activeColor="lightgreen">ON</ControlOption>
                        <Divider>|</Divider>
                        <ControlOption $isActive={!isRotating} $activeColor="#ff5555">OFF</ControlOption>
                    </button>
                </ControlRow>

                <ControlRow>
                    <ControlLabel>Forme</ControlLabel>
                    <button onClick={() => setIsSphere(!isSphere)} aria-label="Toggle Forme">
                        <ControlOption $isActive={!isSphere} $activeColor={color}>Cube</ControlOption>
                        <Divider>|</Divider>
                        <ControlOption $isActive={isSphere} $activeColor={color}>Rond</ControlOption>
                    </button>
                </ControlRow>

            </CubeParamsContainer>

            <CubeGroup style={{ rotateX: rotationX, rotateY: rotationY }}>
                {GRID_POSITIONS.map((pos, index) => (
                    <SubCube key={`cube-${index}`} position={pos} offset={offset} isSphere={isSphere} color={color} hoverColor={hoverColor} />
                ))}
            </CubeGroup>
        </FrameCubeScene>
    );
};