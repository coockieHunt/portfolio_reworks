import { useState, useRef, ChangeEvent } from 'react';

// API
import { sendEmail } from '../../api/mail.api';

// styles
import * as styled from "./Contact.style";
import { DotGridEffect } from '../../styles/effect';

// components
import * as FormComponent from "../../components/Form/Form.component";
import { TitleTextComponent } from "../../components/Text/Text.component";
import { Button } from "../../components/Button/Button";
import { Link } from '../../components/Button/Button';

// icon
import { AiOutlineMail, AiOutlineSend } from 'react-icons/ai';
import { BiSolidMap, BiLogoLinkedin } from 'react-icons/bi';

// context
import { useAlert } from '../../context/alert.context';

// config
import { ContactEmail, MailDefault } from '../../config';

// analytics
import { trackEvent} from '../../components/umami/umami.components';

// Types
export interface IContactContainerProps {
    id?: string;
}

export interface ICaptchaRef {
    handleReset: () => void;
}

export interface IMailForm {
    firstName: string;
    lastName?: string;
    email: string;
    message: string;
}

export const ContactContainer: React.FC<IContactContainerProps> = ({ id }) => {
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

        if (data.status === 429) {
            addAlert("Trop de tentatives. Veuillez patienter.", "#ff9900", 5000);
            trackEvent('Contact Form Error', { reason: 'Rate limited' });
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

    return (
        <div id={id}>
            <TitleTextComponent subtitle={"A votre service"} style={{ width: "100%" }}>
                Me contacter
            </TitleTextComponent>
            <styled.Text>
                Un projet ? Une question ? <br />
                Remplissez ce formulaire, je vous répondrai rapidement.
            </styled.Text>
            <styled.Container>
                <styled.Info>
                    <DotGridEffect $isHovered={true} $DotColor="#feffff11" $Spacing="18px" $DotSize="2px" />
                    <div className="content">
                        <div className="title">
                            <h2>Informations</h2>
                            <span>Mes coordonnées directes</span>
                        </div>
                        <div className="container">
                            <Link className="ItemInfo" href={`mailto:${ContactEmail}`} ariaLabel="Email" >
                                <AiOutlineMail />
                                <div><span className='name'>Email</span><span className='info'>{ContactEmail}</span></div>
                            </Link>
                            <Link className="ItemInfo"  href="https://goo.gl/maps/YOURMAPLINK" ariaLabel="Map" >
                                <BiSolidMap />
                                <div><span className='name'>Localisation</span><span className='info'>Nîmes (30), France</span></div>
                            </Link>
                            <Link className="ItemInfo" href="https://linkedin.com/in/jonathan-gleyze" ariaLabel="LinkedIn" >
                                <BiLogoLinkedin />
                                <div><span className='name'>LinkedIn</span><span className='info'>Jonathan Gleyze</span></div>
                            </Link>
                        </div>
                    </div>
                </styled.Info>
                <styled.ContactForm>
                    <h2>Envoyer un message</h2>
                    <styled.FormInstruction><span>(*)</span> Champs obligatoires</styled.FormInstruction>
                    <FormComponent.Groupe>
                        <FormComponent.Inline>
                            <FormComponent.InputText
                                name="firstName"
                                value={output.firstName}
                                onChange={handleChange}
                                label="Prénom"
                                placeHolder="John"
                                required={true}
                            />
                            <FormComponent.InputText
                                name="lastName"
                                value={output.lastName}
                                onChange={handleChange}
                                label="Nom"
                                placeHolder="Doe"
                                required={false}
                            />
                        </FormComponent.Inline>
                        <FormComponent.InputEmail
                            name="email"
                            value={output.email}
                            onChange={handleChange}
                            label="Email"
                            placeHolder="secteur@domaine.fr"
                            required={true}
                        />
                        <input
                            type="text"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                            style={{ opacity: 0, position: 'absolute', top: 0, left: 0, height: 0, width: 0, zIndex: -1 }}
                            autoComplete="off"
                            tabIndex={-1}        
                            aria-hidden="true"  
                        />
                        <FormComponent.InputTextArea
                            name="message"
                            value={output.message}
                            onChange={handleChange}
                            label="Message"
                            placeHolder="Ex. Salut, je veux créer un site web pour mes pingouins que chante du heavy metal. 🐧🤟 comment vous pouvez m'aider !"
                            required={true}
                        />
                    </FormComponent.Groupe>
                    <FormComponent.CaptchaComponent
                        ref={captchaComponentRef}
                        isCaptchaValid={isCaptchaValid}
                        setIsCaptchaValid={setIsCaptchaValid}
                    />
                    <styled.ActionForm>
                        <span className='resetForm' onClick={handleReset}>Réinitialiser</span>
                        <Button
                            onClick={handleSubmit}
                            icon={<AiOutlineSend />}
                            disabled={IsCoolDown}
                        >
                            {IsCoolDown ? `attendre ${CoolDownTime}s` : 'Envoyer'}
                        </Button>
                    </styled.ActionForm>
                </styled.ContactForm>
            </styled.Container>
        </div>
    );
};