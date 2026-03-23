import { ReactNode } from 'react';
import { IAlert } from '../../context/interface/alert.interface';

export interface IAlertItemProps {
    alert: IAlert;
    primaryColor: string;
    onClose: (alert: IAlert) => void;
}

export interface IAlertContainerProps {
    $coloralert: string;
    $timer_bar: string;
    $message?: ReactNode;
}

export interface IContainerProps {
    $direction?: 'column' | 'column-reverse';
}
