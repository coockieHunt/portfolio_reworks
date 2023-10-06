import { Text } from "./style/AccentText.style"
import { Gradient } from "./style/CradiantText.style"

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