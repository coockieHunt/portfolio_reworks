import React, { createContext, useContext, useState } from 'react';
import { AlertContainerComponent } from '../components/Alert/Alert.component';

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children, debug }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (alert) => {
    setAlerts([...alerts, alert]);
    if(alert.delay !== undefined){
      autoCloseAlert(alerts.length, alert.delay)
    }
  };

  const autoCloseAlert = (index, delay) => {
      setTimeout (() =>{
        removeAlert(index)
      }, delay)
  }

  const removeAlert = (index) => {
    const newAlerts = [...alerts];
    newAlerts.splice(index, 1);
    setAlerts(newAlerts);
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      <AlertContainerComponent view={debug}/>
      {children}
    </AlertContext.Provider>
  );
};
