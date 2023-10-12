import React, {useState, useEffect }  from 'react';
import { Container, AlertContainer } from './style/Alert.style';
import { useAlert } from '../../context/alert.context';

import {RxCross2} from 'react-icons/rx'
import { COLOR_ALERT } from './config';



export const AlertContainerComponent = ({view }) => {
    const { alerts, removeAlert } = useAlert();

    return (
      <Container style={view && {backgroundColor:'#ff000032' }}>
        {alerts.map((alert, index) => (
          <AlertContainer 
            key={index} 
            style={{pointerEvents: 'auto'}}
            $coloralert={alert.colorAlert ? alert.colorAlert : COLOR_ALERT.default}
            className={alert.fadingOut ? 'fadeOut' : ''}
          >
            <div className="content">
              <div className="progress-bar" timer_bar={alert.delay ? "block" : "none"} style={{ animationDuration: `${alert.delay}ms` }}></div>
              <span>{alert.message}</span>
            </div>
           
            <button onClick={() => 
                removeAlert(index)
            }><RxCross2/></button>
          </AlertContainer>
        ))}
      </Container>
    );
  };