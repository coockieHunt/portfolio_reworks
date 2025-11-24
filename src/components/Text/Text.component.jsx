import { Text } from "./style/AccentText.style"
import { Gradient } from "./style/GradientText.style"
import { ToText } from "./style/LinkText.style"
import chroma from 'chroma-js';
import { TitleContainer, Title, BackTitle } from "./style/TitleText.style"
import { useSettingContext, } from "../../context/Setting.context";
import { COLOR_SETTING } from '../../config.jsx'

/**
 * AccentTextComponent
 * 
 * This component overlays text on top of existing content for an accent effect.
 * 
 * @param children {ReactNode} - The text content to be displayed on top of other content.
 */
export const AccentTextComponent = ({ children, className }) => {
    return(
        <Text className={className}>{children}</Text>
    )
}

/**
 * TitleTextComponent
 *
 * Title component with subtitle.
 *
 * @param children - Main title
 * @param subtitle - Subtitle of the component.
 * @param subtitleOpacity - Subtitle opacity (default value: 0.2).
 */ 
export const TitleTextComponent = ({ children, subtitle, subtitleOpacity= 0.2, style }) => {
    return(
        <TitleContainer style={style}>
            <Title>{children}</Title>
            <BackTitle  style={{ opacity: subtitleOpacity }}>{subtitle}</BackTitle>   
        </TitleContainer>
    )
}

/**
 * GradientTextContainer
 * 
 * This component creates a container with an animated gradient background by primary color.
 * 
 * @param children {ReactNode} - The content to be displayed within the gradient container.
 */
export const GradientTextContainer = ({ children }) => {
    const theme = useSettingContext();
    const steps = 5;

    const startColorChroma = chroma(COLOR_SETTING[theme.settings.theme].primary);

    const gradientColors = Array.from({ length: steps + 1 }, (_, index) =>
    startColorChroma
        .brighten(0.3 * index) 
        .saturate(0.3 * index)
        .hex()
    );

    return (<Gradient color={gradientColors}>{children}</Gradient>);
}

/**
 * A component that renders a secure link with specified text.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.children - The content to be displayed as the link text.
 * @param {string} props.to - The URL to which the link should navigate.
 * @returns {JSX.Element} A secure link element.
 *
 * @example
 */
export const LinkTextComponent = ({ children, to}) => {
    return (
        <ToText 
            href={to} 
            target="_blank" 
            rel="noopener noreferrer"
        >
            {children}
        </ToText>
    );
}