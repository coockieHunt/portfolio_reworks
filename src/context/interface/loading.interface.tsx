import { ReactNode } from 'react';

export interface ILoadingConfig {
    color: string;
    duration: number;
    text: ReactNode;
}

export interface ILoadingContext {
    showLoading: (color?: string, durationMs?: number, text?: ReactNode) => void;
    hideLoading: () => void;
}

export interface ILoadingProviderProps {
    children: ReactNode;
}