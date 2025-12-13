import React from 'react';
import { Mouse } from "./Mouse.style";
import { useColorSettings, useLightSettings } from "../../config";

export interface IMouseComponentProps {
    type?: 'mouse' | 'phone';
}

export const MouseComponent: React.FC<IMouseComponentProps> = ({ type = "mouse" }) => {
    const colorSettings = useColorSettings();
    const lightSettings = useLightSettings();
    
    return (
        <Mouse 
            $type={type} 
            $colorSettings={colorSettings}
            $lightSettings={lightSettings}
            aria-hidden="true"
        />
    );
};