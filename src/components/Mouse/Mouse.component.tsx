import React from 'react';
import { Mouse } from "./Mouse.style";

export interface IMouseComponentProps {
    type?: 'mouse' | 'phone';
}

export const MouseComponent: React.FC<IMouseComponentProps> = ({ type = "mouse" }) => {
    
    return (
        <Mouse 
            $type={type} 
            $colorSettings={{ primary: '#fff' }}
            aria-hidden="true"
        />
    );
};