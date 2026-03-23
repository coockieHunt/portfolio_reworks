import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Loading } from '../components/Loading/Loading.component';
import { useScrollbar } from '../hooks/useScrollBar.hook';

import {
    ILoadingContext,
    ILoadingProviderProps,
    ILoadingConfig,
} from './interface/loading.interface';

const LoadingContext = createContext<ILoadingContext | undefined>(undefined);

export const useLoading = (): ILoadingContext => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within LoadingProvider');
    }
    return context;
};

export const LoadingProvider: React.FC<ILoadingProviderProps> = ({
    children,
}) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    const [config, setConfig] = useState<ILoadingConfig>({
        color: 'white',
        duration: 2,
        text: '',
    });
    const [animKey, setAnimKey] = useState<number>(0);

    useScrollbar(isActive);

    const showLoading = (
        color?: string,
        durationMs?: number,
        text?: ReactNode,
    ): void => {
        const durationSec = (durationMs || 2000) / 1000;
        setConfig({
            color: color || 'white',
            duration: durationSec,
            text: text || '',
        });
        setAnimKey((prev) => prev + 1);
        setIsActive(true);
    };

    const hideLoading = (): void => {
        setIsActive(false);
    };

    return (
        <LoadingContext.Provider value={{ showLoading, hideLoading }}>
            {children}
            {isActive && (
                <Loading
                    key={animKey}
                    color={config.color}
                    duration={config.duration * 1000}
                    text={config.text}
                />
            )}
        </LoadingContext.Provider>
    );
};
