import React  from 'react';
import { Container, AlertContainer } from './style/Alert.style';
import { useAlert } from '../../context/alert.context';
import {RxCross2} from 'react-icons/rx'
import { DEBUG } from './config/main';
import { COLOR_SETTING } from '../../config';
import { useSettingContext } from '../../context/Setting.context';



/**
 * Represents a component for rendering alert containers.
 * @returns {JSX.Element} The rendered alert container component.
 */
export const AlertContainerComponent = () => {
    const { alerts, removeAlert } = useAlert();
    const theme = useSettingContext();

    return (
        <Container 
            style={DEBUG.container ? { backgroundColor: DEBUG.container_color } : {}
        }>
        {alerts.map((alert) => (
            <AlertContainer 
                key={alert.id} 
                style={{ pointerEvents: 'auto' }}
                $coloralert={alert.colorAlert ? alert.colorAlert : COLOR_SETTING[theme.settings.theme].primary}
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