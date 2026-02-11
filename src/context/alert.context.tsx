import React, { createContext, useContext, useState, ReactNode } from 'react';

import {
    IAlert,
    IAlertContext,
    IAlertProviderProps,
} from './interface/alert.interface';

const AlertContext = createContext<IAlertContext | undefined>(undefined);

/**
 * Custom hook for accessing the alert context.
 * @returns {IAlertContext} An object containing alerts and related functions.
 */
export const useAlert = (): IAlertContext => {
    const ctx = useContext(AlertContext);
    if (!ctx) {
        if (typeof window !== 'undefined') {
            console.warn(
                'useAlert called outside of AlertProvider. Returning no-op fallbacks.',
            );
        }
        return {
            alerts: [],
            addAlert: () => {},
            removeAlert: () => {},
        };
    }
    return ctx;
};

/**
 * A provider component for managing alerts.
 * @param {IAlertProviderProps} props - The component's props.
 * @returns {JSX.Element} The rendered provider component.
 */
export const AlertProvider: React.FC<IAlertProviderProps> = ({
    children,
    debug,
}) => {
    const [alerts, setAlerts] = useState<IAlert[]>([]);

    const addAlert = (
        message: ReactNode,
        colorAlert: string,
        delay?: number,
    ): void => {
        const newAlert: IAlert = { id: Date.now(), message, colorAlert, delay };
        setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

        if (delay) {
            setTimeout(() => removeAlert(newAlert), delay);
        }
    };

    const removeAlert = (alert: IAlert): void => {
        setAlerts((prevAlerts) => prevAlerts.filter((a) => a.id !== alert.id));
    };

    return (
        <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
            {children}
        </AlertContext.Provider>
    );
};
