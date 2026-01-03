import { useState, useEffect, useRef } from 'react';

import LogoComponentDetailedFull from '../../assets/images/logo/logo-detailed-full.svg?react';
import LogoComponentDetailedMinimal from '../../assets/images/logo/logo-detailed-minimal.svg?react';
import LogoComponentSimpleFull from '../../assets/images/logo/logo-simple-full.svg?react';
import LogoComponentSimpleMinimal from '../../assets/images/logo/logo-simple-minimal.svg?react';

import { StyledAnimatedSvg } from './LogoAnim.stye';

export interface ILogoComponentProps extends React.SVGProps<SVGSVGElement> {
    version:
        | 'animated'
        | 'detailed-full'
        | 'detailed-minimal'
        | 'simple-full'
        | 'simple-minimal';
}

export interface IStyledAnimatedSvgProps {
    $isVisible: boolean;
}

const AnimatedLogo = (props: React.SVGProps<SVGSVGElement>) => {
    const [isVisible, setIsVisible] = useState(false);
    const logoRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            },
        );

        if (logoRef.current) {
            observer.observe(logoRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <StyledAnimatedSvg
            ref={logoRef}
            $isVisible={isVisible}
            width="169"
            height="322"
            viewBox="0 0 169 322"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g fill="currentColor">
                <circle cx="7.364" cy="83.442" r="7.364" />
                <circle cx="8.591" cy="31.896" r="7.364" />
                <circle cx="7.364" cy="288.396" r="7.364" />
                <circle cx="8.591" cy="57.669" r="7.364" />
                <circle cx="78.545" cy="109.214" r="7.364" />
                <circle cx="78.545" cy="134.987" r="7.364" />
                <circle cx="55.227" cy="134.987" r="7.364" />
                <circle cx="31.909" cy="134.987" r="7.364" />
                <circle cx="54" cy="83.442" r="7.364" />
                <circle cx="55.227" cy="109.214" r="7.364" />
                <circle cx="31.909" cy="109.214" r="7.364" />
                <circle cx="31.909" cy="57.669" r="7.364" />
                <circle cx="7.364" cy="262.624" r="7.364" />
                <circle cx="30.682" cy="262.624" r="7.364" />
                <circle cx="30.682" cy="83.442" r="7.364" />
                <circle cx="7.364" cy="236.851" r="7.364" />
                <circle cx="54" cy="236.851" r="7.364" />
                <circle cx="30.682" cy="236.851" r="7.364" />
                <circle cx="30.682" cy="211.078" r="7.364" />
                <circle cx="77.318" cy="211.078" r="7.364" />
                <circle cx="54" cy="211.078" r="7.364" />
                <circle cx="103.315" cy="134.987" r="7.364" />
                <circle cx="78.545" cy="160.76" r="7.364" />
                <circle cx="55.227" cy="160.76" r="7.364" />
                <circle cx="103.315" cy="160.76" r="7.364" />
                <circle cx="127.636" cy="160.76" r="7.364" />
                <circle cx="77.318" cy="186.533" r="7.364" />
                <circle cx="54" cy="186.533" r="7.364" />
                <circle cx="31.909" cy="186.533" r="7.364" />
                <circle cx="102.087" cy="186.533" r="7.364" />
            </g>
            <path
                d="M102 314H134.568L150 301V262"
                stroke="currentColor"
                strokeWidth="16"
                fill="none"
            />
            <path
                d="M161 56V23.432L148 8H109"
                stroke="currentColor"
                strokeWidth="16"
                fill="none"
            />
        </StyledAnimatedSvg>
    );
};

/**
 * LogoComponent renders different versions of the logo based on the `version` prop.
 *
 * @component
 * @param {'animated'|'detailed-full'|'detailed-minimal'|'simple-full'|'simple-minimal'} version - The version of the logo to render.
 * @param {object} rest - Additional props passed to the logo component.
 * @returns {JSX.Element} The selected logo component.
 */

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
