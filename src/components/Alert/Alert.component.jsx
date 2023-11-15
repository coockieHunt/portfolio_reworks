import React  from 'react';
import { Container, AlertContainer } from './style/Alert.style';
import { useAlert } from '../../context/alert.context';

import {RxCross2} from 'react-icons/rx'
import { COLOR_ALERT, DEBUG } from './config/main';


/**
 * Represents a component for rendering alert containers.
 * @returns {JSX.Element} The rendered alert container component.
 */
export const AlertContainerComponent = () => {
    const { alerts, removeAlert } = useAlert();

    return (
        <Container style={DEBUG.container ? { backgroundColor: DEBUG.container_color } : {}}>
        {alerts.map((alert) => (
            <AlertContainer 
                key={alert.id} 
                style={{ pointerEvents: 'auto' }}
                $coloralert={alert.colorAlert ? alert.colorAlert : COLOR_ALERT.default}
            >
                <div className="content">
                    <div className="progress-bar" style={{ animationDuration: `${alert.delay}ms` }}></div>
                    <span>{alert.message}</span>
                </div>

                <button onClick={() => removeAlert(alert)}><RxCross2/></button>
            </AlertContainer>
        ))}
    </Container>
    );
};