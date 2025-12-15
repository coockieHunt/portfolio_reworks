import React from 'react';
import { Mouse } from "./Mouse.style";
import { getColorSettings } from "../../config";
import { useSettingContext } from "../../context/Setting.context";

export interface IMouseComponentProps {
    type?: 'mouse' | 'phone';
}

export const MouseComponent: React.FC<IMouseComponentProps> = ({ type = "mouse" }) => {
    const { settings } = useSettingContext() as any;
    const colorSettings = getColorSettings(settings);
    
    return (
        <Mouse 
            $type={type} 
            $colorSettings={colorSettings}
            aria-hidden="true"
        />
    );
};