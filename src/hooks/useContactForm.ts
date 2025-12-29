import { useState, useRef, ChangeEvent } from 'react';
import { useAlert } from '../context/alert.context';
import { sendEmail } from '../api/mail.api';
import { trackEvent } from '../components/umami/umami.components';
import { MailDefault } from '../config';

// Interfaces
export interface ICaptchaRef {
    handleReset: () => void;
}

export interface IMailForm {
    firstName: string;
    lastName?: string;
    email: string;
    message: string;
}

export const useContactForm = () => {
    const { addAlert } = useAlert();
    const captchaComponentRef = useRef<ICaptchaRef>(null);
    
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    const [output, setOutput] = useState<IMailForm>(MailDefault);
    const [honeypot, setHoneypot] = useState('');
    const [IsCoolDown, SetIsCoolDown] = useState(false);
    const [CoolDownTime, SetCoolDownTime] = useState(0);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setOutput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleReset = () => {
        setOutput(MailDefault);
        if (captchaComponentRef.current) captchaComponentRef.current.handleReset();
        setIsCaptchaValid(false);
    };

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const ProcessSendEmail = async (payload: any) => {
        const data = await sendEmail(payload);

        if (!data) {
            addAlert("Erreur de connexion au serveur.", "#cc3300", 4000);
            trackEvent('Contact Form Error', { reason: 'No response' });
            return false;
        }

        if (data.error) {
            if (data.message === 'Trop de tentatives. Réessayez plus tard.') {
                addAlert("Trop de tentatives. Veuillez patienter.", "#ff9900", 5000);
                trackEvent('Contact Form Error', { reason: 'Rate limited' });
            } else {
                console.warn('Erreur API:', data);
                trackEvent('Contact Form Error', { reason: data.message || 'API Technical Error' });
                addAlert(data.message || "Le service mail rencontre un problème technique.", "#ffcc00", 4000);
            }
            return false;
        }

        if (data.success) {
            trackEvent('Contact Form Submitted', { result: 'Success' }); 
            return true;
        }

        console.warn('Erreur API:', data);
        trackEvent('Contact Form Error', { reason: 'API Technical Error' });
        addAlert("Le service mail rencontre un problème technique.", "#ffcc00", 4000);
        return false;
    };

    const CheckData = (data: IMailForm) => {
        if (!data.email || !isValidEmail(data.email)) {
            addAlert('Email invalide.', "#cc3300", 4000); return false;
        }
        if (!data.firstName) {
            addAlert('Prénom requis.', "#cc3300", 4000); return false;
        }
        if (!data.message) {
            addAlert('Message requis.', "#cc3300", 4000); return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (honeypot) {
            console.log('Bot detected.');
            return;
        }
        if (!isCaptchaValid) {
            addAlert('Veuillez valider le Captcha.', "#cc3300", 4000);
            return;
        }
        if (CheckData(output)) {
            const fullName = output.lastName
                ? `${output.firstName} ${output.lastName}`
                : output.firstName;
            const payload = {
                name: fullName,
                email: output.email,
                subject: `Contact: ${fullName}`,
                message: output.message
            };
            const isSent = await ProcessSendEmail(payload);
            if (isSent) {
                SetIsCoolDown(true);
                SetCoolDownTime(10);
                const timer = setInterval(() => {
                    SetCoolDownTime(prev => {
                        if (prev <= 1) {
                            SetIsCoolDown(false);
                            clearInterval(timer);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
                addAlert('Message envoyé avec succès !', "green", 4500);
                handleReset();
            }
        }
    };

    return {
        output,
        isCaptchaValid,
        setIsCaptchaValid,
        honeypot,
        setHoneypot,
        IsCoolDown,
        CoolDownTime,
        handleChange,
        handleSubmit,
        handleReset,
        captchaComponentRef
    };
};