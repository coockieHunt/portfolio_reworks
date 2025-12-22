// lib
import React from 'react';
import { X } from 'lucide-react';

// styles
import { Container, AlertContainer } from './Alert.style';

// config
import { COLOR_SETTING } from '../../config';

// context
import { useAlert } from '../../context/alert.context';
import { useSettingContext } from '../../context/Setting.context';

// Types
import { IAlertItemProps, IContainerProps } from './Alert.interfaces';

const AlertItem: React.FC<IAlertItemProps> = ({ alert, primaryColor, onClose }) => {
    const activeColor = alert.colorAlert || primaryColor;
    const timerDisplay = alert.delay ? "block" : "none";

    return (
        <AlertContainer
            key={alert.id}
            style={{ pointerEvents: 'auto' }}
            $coloralert={activeColor}
            $timer_bar={timerDisplay}
            $message={alert.message}
        >
            <div className="content">
                <div 
                    className="progress-bar" 
                    style={{ animationDuration: `${alert.delay}ms` }} 
                />
                <span>{alert.message}</span>
            </div>

            <button
                onClick={() => onClose(alert)}
                aria-label="Fermer l'alerte"
                title="Fermer"
                type="button"
            >
                <X aria-hidden="true" focusable={false} />
            </button>
        </AlertContainer>
    );
};

export const AlertContainerComponent: React.FC<IContainerProps> = ({ $direction = 'column-reverse' }) => {
    const { alerts, removeAlert } = useAlert();
    const { settings } = useSettingContext();

    const themePrimaryColor = COLOR_SETTING[settings.theme]?.primary || '#000';

    return (
        <Container $direction={$direction}>
            {alerts.map((alert) => (
                <AlertItem
                    key={alert.id}
                    alert={alert}
                    primaryColor={themePrimaryColor}
                    onClose={removeAlert}
                />
            ))}
        </Container>
    );
};