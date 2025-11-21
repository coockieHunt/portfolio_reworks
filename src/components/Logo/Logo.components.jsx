import LogoComponentDetailedFull from '../../assets/images/logo/logo-detailed-full.svg?react';
import LogoComponentDetailedMinimal from '../../assets/images/logo/logo-detailed-minimal.svg?react';
import LogoComponentSimpleFull from '../../assets/images/logo/logo-simple-full.svg?react';
import LogoComponentSimpleMinimal from '../../assets/images/logo/logo-simple-minimal.svg?react'; 


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