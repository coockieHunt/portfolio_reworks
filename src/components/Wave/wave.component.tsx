import { m } from 'framer-motion';

/**
 * WaveComponent renders an animated SVG wave using Framer Motion.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.colorPrimary - The primary color used for the wave strokes.
 * @returns {JSX.Element} Animated SVG wave component.
 *
 * @example
 * <WaveComponent colorPrimary="#3498db" />
 */
export const WaveComponent = ({ colorPrimary }) => {
    // Wave paths starting positions and end variants

    // First wave path
    const StartOne =
        'M0,224L60,208C120,192,240,160,360,144C480,128,600,128,720,138.7C840,149,960,171,1080,192C1200,213,1320,235,1380,245.3L1440,256';
    const EndOne =
        'M0,220L60,212C120,200,240,170,360,150C480,130,600,135,720,145C840,155,960,180,1080,200C1200,220,1320,240,1380,250L1440,260';

    // Second wave path
    const StartTwo =
        'M0,160L48,170.7C96,181,192,203,288,208C384,213,480,203,576,170.7C672,139,768,85,864,80C960,75,1056,117,1152,138.7C1248,160,1344,160,1392,160L1440,160';
    const EndTwo =
        'M0,165L48,175C96,185,192,208,288,212C384,216,480,208,576,175C672,142,768,90,864,85C960,80,1056,122,1152,142C1248,162,1344,165,1392,165L1440,165';

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            style={{ width: '100%', height: 'auto', display: 'block' }}
        >
            <m.path
                fill="none"
                stroke={colorPrimary}
                strokeOpacity="0.3"
                strokeWidth="2"
                initial={{ d: StartOne }}
                animate={{ d: [StartOne, EndOne, StartOne] }}
                transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: 'easeInOut',
                }}
            />

            <m.path
                fill="none"
                stroke={colorPrimary}
                strokeOpacity="1"
                strokeWidth="4"
                initial={{ d: StartTwo }}
                animate={{ d: [StartTwo, EndTwo, StartTwo] }}
                transition={{
                    repeat: Infinity,
                    duration: 7,
                    ease: 'easeInOut',
                }}
            />
        </svg>
    );
};
