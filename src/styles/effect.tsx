import styled from 'styled-components';

interface IGridEffectProps {
    $bigColor?: string;
    $smallColor?: string;
    $bigSize?: string;
    $smallSize?: string;
    $bigOffset?: string;
    $smallOffset?: string;
}

interface IDotGridEffectProps {
    $DotColor?: string;
    $DotSize?: string;
    $Spacing?: string;
    $offsetX?: string;
    $offsetY?: string;
    $isHovered?: boolean;
}

export const GridEffect = styled.div<IGridEffectProps>`
    --big-c: ${(p) => p.$bigColor || '#38373753'};
    --small-c: ${(p) => p.$smallColor || '#38373753'};
    
    background-image:
        linear-gradient(var(--big-c) 2px, transparent 2px),
        linear-gradient(90deg, var(--big-c) 2px, transparent 2px),
        linear-gradient(var(--small-c) 1px, transparent 1px),
        linear-gradient(90deg, var(--small-c) 1px, transparent 1px);

    background-size:
        ${(p) => p.$bigSize || '100px'} ${(p) => p.$bigSize || '100px'},
        ${(p) => p.$bigSize || '100px'} ${(p) => p.$bigSize || '100px'},
        ${(p) => p.$smallSize || '20px'} ${(p) => p.$smallSize || '20px'},
        ${(p) => p.$smallSize || '20px'} ${(p) => p.$smallSize || '20px'};

    background-position:
        ${(p) => p.$bigOffset || '-2px'} ${(p) => p.$bigOffset || '-2px'},
        ${(p) => p.$bigOffset || '-2px'} ${(p) => p.$bigOffset || '-2px'},
        ${(p) => p.$smallOffset || '-1px'} ${(p) => p.$smallOffset || '-1px'},
        ${(p) => p.$smallOffset || '-1px'} ${(p) => p.$smallOffset || '-1px'};
`;

export const DotGridEffect = styled.div<IDotGridEffectProps>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;

    background-image: radial-gradient(
        circle,
        ${(p) => p.$DotColor || '#383737'} ${(p) => p.$DotSize || '2px'},
        transparent ${(p) => p.$DotSize || '2px'}
    );
    
    background-size: ${(p) => p.$Spacing || '20px'} ${(p) => p.$Spacing || '20px'};
    background-position: ${(p) => p.$offsetX || '0'} ${(p) => p.$offsetY || '0'};

    opacity: ${(p) => (p.$isHovered ? 1 : 0)};
    transition: opacity 0.5s ease-in-out;
    mix-blend-mode: overlay;
    pointer-events: none;
`;

export const BackDrop = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1199;
    
    background: color-mix(in srgb, var(--background-color) 65%, transparent);
    
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    opacity: ${(p) => (p.$isOpen ? 1 : 0)};
    pointer-events: ${(p) => (p.$isOpen ? 'auto' : 'none')};
    transition: opacity 0.5s ease;
`;