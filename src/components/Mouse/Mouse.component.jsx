import { Mouse } from "./style/Mouse.style"
import { useColorSettings, useLightSettings } from "../../config"

/**
 * MouseComponent
 * 
 * @component
 * @description
 * This component renders a mouse or phone icon that pulses when hovered over.
 * 
 * @param {Object} props - The properties of the MouseComponent.
 * @param {string} props.type - The type of the icon to be rendered. It can be "mouse" or "phone". Defaults to "mouse".
 * 
 * @returns {JSX.Element} React component.
 */
export const MouseComponent = ({ type = "mouse" }) => {
    const colorSettings = useColorSettings();
    const lightSettings = useLightSettings();
    
    return (
        <Mouse 
            type={type} 
            $colorSettings={colorSettings}
            $lightSettings={lightSettings}
        />
    )
}