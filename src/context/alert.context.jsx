import React, { createContext, useContext, useState } from 'react';
import { AlertContainerComponent } from '../components/Alert/Alert.component';

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

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