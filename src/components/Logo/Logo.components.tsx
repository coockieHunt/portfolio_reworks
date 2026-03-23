import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import LogoComponentDetailedFull from '../../assets/images/logo/logo-detailed-full.svg?react';
import LogoComponentDetailedMinimal from '../../assets/images/logo/logo-detailed-minimal.svg?react';
import LogoComponentSimpleFull from '../../assets/images/logo/logo-simple-full.svg?react';
import LogoComponentSimpleMinimal from '../../assets/images/logo/logo-simple-minimal.svg?react';

export interface ILogoComponentProps extends React.SVGProps<SVGSVGElement> {
    version:
        | 'animated'
        | 'detailed-full'
        | 'detailed-minimal'
        | 'simple-full'
        | 'simple-minimal';
}

const circles = [
    { cx: 7.364,   cy: 83.442  },
    { cx: 8.591,   cy: 31.896  },
    { cx: 7.364,   cy: 288.396 },
    { cx: 8.591,   cy: 57.669  },
    { cx: 78.545,  cy: 109.214 },
    { cx: 78.545,  cy: 134.987 },
    { cx: 55.227,  cy: 134.987 },
    { cx: 31.909,  cy: 134.987 },
    { cx: 54,      cy: 83.442  },
    { cx: 55.227,  cy: 109.214 },
    { cx: 31.909,  cy: 109.214 },
    { cx: 31.909,  cy: 57.669  },
    { cx: 7.364,   cy: 262.624 },
    { cx: 30.682,  cy: 262.624 },
    { cx: 30.682,  cy: 83.442  },
    { cx: 7.364,   cy: 236.851 },
    { cx: 54,      cy: 236.851 },
    { cx: 30.682,  cy: 236.851 },
    { cx: 30.682,  cy: 211.078 },
    { cx: 77.318,  cy: 211.078 },
    { cx: 54,      cy: 211.078 },
    { cx: 103.315, cy: 134.987 },
    { cx: 78.545,  cy: 160.76  },
    { cx: 55.227,  cy: 160.76  },
    { cx: 103.315, cy: 160.76  },
    { cx: 127.636, cy: 160.76  },
    { cx: 77.318,  cy: 186.533 },
    { cx: 54,      cy: 186.533 },
    { cx: 31.909,  cy: 186.533 },
    { cx: 102.087, cy: 186.533 },
];

const dotVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: i * 0.004,
            duration: 0.22,
            ease: [0.34, 1.56, 0.64, 1] as const,
        },
    }),
};

const lineVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
        opacity: 1,
        pathLength: 1,
        transition: {
            delay: 0.08,
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
};

const AnimatedLogo = (props: React.SVGProps<SVGSVGElement>) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' });

    return (
        <svg
            ref={ref}
            width="169"
            height="322"
            viewBox="0 0 169 322"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g fill="currentColor">
                {circles.map((circle, i) => (
                    <motion.circle
                        key={i}
                        cx={circle.cx}
                        cy={circle.cy}
                        r={7.364}
                        custom={i}
                        variants={dotVariants}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    />
                ))}
            </g>

            <motion.path
                d="M102 314H134.568L150 301V262"
                stroke="currentColor"
                strokeWidth="16"
                fill="none"
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            />
            <motion.path
                d="M161 56V23.432L148 8H109"
                stroke="currentColor"
                strokeWidth="16"
                fill="none"
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            />
        </svg>
    );
};

export const LogoComponent = ({ version, ...rest }: ILogoComponentProps) => {
    let LogoToRender: React.FC<React.SVGProps<SVGSVGElement>>;

    switch (version) {
        case 'animated':
            LogoToRender = AnimatedLogo;
            break;
        case 'detailed-full':
            LogoToRender = LogoComponentDetailedFull;
            break;
        case 'detailed-minimal':
            LogoToRender = LogoComponentDetailedMinimal;
            break;
        case 'simple-full':
            LogoToRender = LogoComponentSimpleFull;
            break;
        case 'simple-minimal':
            LogoToRender = LogoComponentSimpleMinimal;
            break;
        default:
            LogoToRender = LogoComponentSimpleMinimal;
    }

    return <LogoToRender {...rest} />;
};