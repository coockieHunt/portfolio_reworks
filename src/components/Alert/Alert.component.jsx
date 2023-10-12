import React  from 'react';
import { Container, AlertContainer } from './style/Alert.style';
import { useAlert } from '../../context/alert.context';

import {RxCross2} from 'react-icons/rx'
import { COLOR_ALERT } from './config';



export const AlertContainerComponent = ({ view }) => {
    const { alerts, removeAlert } = useAlert();

    return (
        <Container style={view && { backgroundColor: '#ff000032' }}>
        {alerts.map((alert, index) => (
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