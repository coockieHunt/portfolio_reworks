import React, { createContext, useContext, useState } from 'react';
import { AlertContainerComponent } from '../components/Alert/Alert.component';

const AlertContext = createContext();

/**
 * Custom hook for accessing the alert context.
 * @returns {object} An object containing alerts and related functions.
 */
export const useAlert = () => {
  return useContext(AlertContext);
};

/**
 * A provider component for managing alerts.
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @param {boolean} [props.debug] - Determines if the provider is in debug mode.
 * @returns {JSX.Element} The rendered provider component.
 */
export const AlertProvider = ({ children, debug }) => {
    const [alerts, setAlerts] = useState([]);

    const addAlert = (message, colorAlert, delay) => {
        const newAlert = { id: Date.now(), message, colorAlert, delay };
        setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

        if (delay) {setTimeout(() => removeAlert(newAlert), delay);}
    };

    const removeAlert = (alert) => {
        setAlerts((prevAlerts) => prevAlerts.filter((a) => a.id !== alert.id));
    };

    return (
        <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
            <AlertContainerComponent view={debug}/>
            {children}
        </AlertContext.Provider>
    );
};