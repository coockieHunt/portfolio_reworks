import { ReactNode } from 'react';

export interface IAlert {
    id: number;
    message: ReactNode;
    colorAlert: string;
    delay?: number;
}

export interface IAlertContext {
    alerts: IAlert[];
    addAlert: (message: ReactNode, colorAlert: string, delay?: number) => void;
    removeAlert: (alert: IAlert) => void;
}

export interface IAlertProviderProps {
    children: ReactNode;
    debug?: boolean;
}
