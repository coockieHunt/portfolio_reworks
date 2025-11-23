import LogoComponentDetailedFull from '../../assets/images/logo/logo-detailed-full.svg?react';
import LogoComponentDetailedMinimal from '../../assets/images/logo/logo-detailed-minimal.svg?react';
import LogoComponentSimpleFull from '../../assets/images/logo/logo-simple-full.svg?react';
import LogoComponentSimpleMinimal from '../../assets/images/logo/logo-simple-minimal.svg?react'; 

/**
 * Renders a logo SVG component based on the specified version.
 *
 * @param {Object} props
 * @param {'detailed-full'|'detailed-minimal'|'simple-full'|'simple-minimal'} props.version - The logo version to render.
 * @returns {JSX.Element} The selected logo component.
 */
export const LogoComponent = ({ version, ...rest }) => {
    let LogoToRender; 

    switch (version) {
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