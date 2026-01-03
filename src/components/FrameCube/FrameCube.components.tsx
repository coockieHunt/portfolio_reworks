import React, { useState, useMemo, memo } from 'react';
import { useAnimationFrame, useMotionValue, Transition } from 'framer-motion';

import {
    FrameCubeScene,
    CubeGroup,
    CubeUnitWrapper,
    CubeFace,
    SliderOffset,
} from './FrameCube.style';

import {
    ControlRow,
    ControlLabel,
    ControlOption,
    ValueDisplay,
    SeparatorLine,
    Divider,
    CubeParamsContainer,
} from './Frame.ui.style';
export interface FrameCubeProps {
    color?: string;
    hoverColor?: string;
}

interface SubCubeProps extends FrameCubeProps {
    position: [number, number, number];
    offset: number;
    isSphere: boolean;
    rotationX: number;
    rotationY: number;
}

const STATIC_CONFIG = {
    translateZ: 30,
    rotSpeedX: 0.01,
    rotSpeedY: 0.015,
    offsetRange: { minOffset: 70, maxOffset: 150 },
    springTransition: {
        type: 'spring',
        mass: 0.5,
        stiffness: 150,
        damping: 15,
    } as Transition,
};

const FACES_CONFIG = [
    { id: 'front', rotX: 0, rotY: 0 },
    { id: 'back', rotX: 180, rotY: 0 },
    { id: 'right', rotX: 0, rotY: 90 },
    { id: 'left', rotX: 0, rotY: -90 },
    { id: 'top', rotX: 90, rotY: 0 },
    { id: 'bottom', rotX: -90, rotY: 0 },
] as const;

const GRID_POSITIONS: [number, number, number][] = [];
for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            GRID_POSITIONS.push([x, y, z]);
        }
    }
}

const POSITION_DATA = GRID_POSITIONS.map((pos) => {
    const dist = Math.sqrt(pos[0] ** 2 + pos[1] ** 2 + pos[2] ** 2);
    const norm = dist === 0 ? 0 : 1 / dist;
    return {
        normX: pos[0] * norm,
        normY: pos[1] * norm,
        normZ: pos[2] * norm,
        sphereRotX: pos[0] * 45,
        sphereRotY: pos[1] * 45,
    };
});

const SubCube: React.FC<SubCubeProps> = memo(
    ({
        position,
        offset,
        isSphere,
        color = '#6366f1',
        hoverColor = '#a78bfa',
        rotationX,
        rotationY,
    }) => {
        const [isHovered, setHovered] = useState(false);

        const posIndex = GRID_POSITIONS.findIndex(
            (p) =>
                p[0] === position[0] &&
                p[1] === position[1] &&
                p[2] === position[2],
        );
        const { normX, normY, normZ, sphereRotX, sphereRotY } =
            POSITION_DATA[posIndex];

        const transforms = useMemo(() => {
            const radius = offset * 1.5;
            return {
                x: isSphere ? normX * radius : position[0] * offset,
                y: isSphere ? normY * radius : position[1] * offset,
                z: isSphere ? normZ * radius : position[2] * offset,
                rotateX: isSphere ? sphereRotX : 0,
                rotateY: isSphere ? sphereRotY : 0,
            };
        }, [
            offset,
            isSphere,
            normX,
            normY,
            normZ,
            sphereRotX,
            sphereRotY,
            position,
        ]);

        const activeColor = isHovered ? hoverColor : color;

        return (
            <CubeUnitWrapper
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                animate={{
                    ...transforms,
                    scale: isHovered ? 0.9 : 1,
                }}
                transition={STATIC_CONFIG.springTransition}
            >
                {FACES_CONFIG.map((face) => (
                    <CubeFace
                        key={face.id}
                        $color={activeColor}
                        $rotateX={face.rotX}
                        $rotateY={face.rotY}
                        $translateZ={STATIC_CONFIG.translateZ}
                    />
                ))}
            </CubeUnitWrapper>
        );
    },
    (prevProps, nextProps) => {
        return (
            prevProps.offset === nextProps.offset &&
            prevProps.isSphere === nextProps.isSphere &&
            prevProps.color === nextProps.color &&
            prevProps.hoverColor === nextProps.hoverColor &&
            prevProps.position[0] === nextProps.position[0] &&
            prevProps.position[1] === nextProps.position[1] &&
            prevProps.position[2] === nextProps.position[2]
        );
    },
);

SubCube.displayName = 'SubCube';

export const WireframeScene: React.FC<FrameCubeProps> = ({
    color = '#4f46e5',
    hoverColor = '#ffffff',
}) => {
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

    const currentRotX = rotationX.get();
    const currentRotY = rotationY.get();

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
                    <button
                        onClick={() => setIsRotating(!isRotating)}
                        aria-label="Toggle Rotation"
                    >
                        <ControlOption
                            $isActive={isRotating}
                            $activeColor="lightgreen"
                        >
                            ON
                        </ControlOption>
                        <Divider>|</Divider>
                        <ControlOption
                            $isActive={!isRotating}
                            $activeColor="#ff5555"
                        >
                            OFF
                        </ControlOption>
                    </button>
                </ControlRow>

                <ControlRow>
                    <ControlLabel>Forme</ControlLabel>
                    <button
                        onClick={() => setIsSphere(!isSphere)}
                        aria-label="Toggle Forme"
                    >
                        <ControlOption
                            $isActive={!isSphere}
                            $activeColor={color}
                        >
                            Cube
                        </ControlOption>
                        <Divider>|</Divider>
                        <ControlOption
                            $isActive={isSphere}
                            $activeColor={color}
                        >
                            Rond
                        </ControlOption>
                    </button>
                </ControlRow>
            </CubeParamsContainer>

            <CubeGroup style={{ rotateX: rotationX, rotateY: rotationY }}>
                {GRID_POSITIONS.map((pos, index) => (
                    <SubCube
                        key={`cube-${index}`}
                        position={pos}
                        offset={offset}
                        isSphere={isSphere}
                        color={color}
                        hoverColor={hoverColor}
                        rotationX={currentRotX}
                        rotationY={currentRotY}
                    />
                ))}
            </CubeGroup>
        </FrameCubeScene>
    );
};
