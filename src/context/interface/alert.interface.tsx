import {ReactNode} from 'react';

export interface IAlert {
    id: number;
    message: string;
    colorAlert: string;
    delay?: number;
}

export interface IAlertContext {
    alerts: IAlert[];
    addAlert: (message: string, colorAlert: string, delay?: number) => void;
    removeAlert: (alert: IAlert) => void;
}

export interface IAlertProviderProps {
    children: ReactNode;
    debug?: boolean;
}