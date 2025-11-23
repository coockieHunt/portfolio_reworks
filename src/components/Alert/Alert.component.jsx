import { Container, AlertContainer } from './style/Alert.style';
import { useAlert } from '../../context/alert.context';
import {RxCross2} from 'react-icons/rx'
import { DEBUG } from './config/main';
import { COLOR_SETTING } from '../../config.jsx';
import { useSettingContext } from '../../context/Setting.context';

/**
 * AlertContainerComponent displays a list of alert messages.
 * 
 * It retrieves alerts from the alert context and renders each alert with a close button.
 * The alert color is determined by the alert's colorAlert property or the current theme's primary color.
 * 
 * @component
 * @returns {JSX.Element} The rendered alert container component.
 */
export const AlertContainerComponent = () => {
    const { alerts, removeAlert } = useAlert();
    const theme = useSettingContext();

    return (
        <Container 
            style={DEBUG.container ? { backgroundColor: DEBUG.container_color } : {}}>
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

                <button 
                    onClick={() => removeAlert(alert)}
                    aria-label="Fermer l'alerte"
                    title="Fermer"
                    style={{background:'transparent', border:'none', cursor:'pointer'}}
                >
                    <RxCross2 aria-hidden="true" focusable={false} />
                </button>
            </AlertContainer>
        ))}
    </Container>
    );
};