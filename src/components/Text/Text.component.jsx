import { Text } from "./style/AccentText.style"
import { Gradient } from "./style/CradiantText.style"
import { ToText } from "./style/LinkText.style"
import { TitleContainer, Title, BackTitle } from "./style/TitleText.style"

/**
 * AccentTextComponent
 * 
 * This component overlays text on top of existing content for an accent effect.
 * 
 * @param children {ReactNode} - The text content to be displayed on top of other content.
 */
export const AccentTextComponent = ({ children }) => {
    return(
        <Text>{children}</Text>
    )
}

/**
 * TitleTextComponenet
 * 
 * Title component with subtitle.
 * 
 * @param subtitle - Subtitle of the component.
 * @param subtitleOpacity - Subtitle opacity (default value: 0.2).
 */ 
export const TitleTextComponenet = ({ children, subtitle, subtitleOpacity= 0.2 }) => {
    return(
        <TitleContainer>
            <Title>{children}</Title>
            <BackTitle  style={{ opacity: subtitleOpacity }}>{subtitle}</BackTitle>   
        </TitleContainer>
    )
}


/**
 * CradiantTextContainer
 * 
 * This component creates a container with an animated gradient background.
 * 
 * @param children {ReactNode} - The content to be displayed within the gradient container.
 */
export const CradiantTextComponent = ({ children }) => {
    return(
        <Gradient>{children}</Gradient>
    )
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
    const Redirect = () => {
        try {
            window.location.href = to
        } catch (error) {
            console.error("Invalid URL");
        }
    };

    return (
        <ToText onClick={Redirect}>{children}</ToText>
    );
}