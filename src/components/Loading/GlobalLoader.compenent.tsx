import React from 'react';
import { useSettingContext } from '../../context/Setting.context';
import {
    LoaderWrapper,
    NeonRing,
    LoadingText,
} from './style/Global.loading.style';

const CONTAINER_STYLE: React.CSSProperties = {
    position: 'relative',
};

export const GlobalLoader: React.FC<{ text?: string }> = ({ text = "initialization" }) => {
    const { settings } = useSettingContext();

    return (
        <LoaderWrapper
            theme={settings}
            role="status"
            aria-live="polite"
            aria-label="Chargement de l'application"
        >
            <div style={CONTAINER_STYLE}>
                <NeonRing theme={settings} />
            </div>
            <LoadingText className="font_code">{text}</LoadingText>
        </LoaderWrapper>
    );
};


