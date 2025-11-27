// react
import { useState, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import { sendEmail } from '../../api/mail.api';

// style
import * as styled from "./Contact.style"


// templates
import { EmailTemplateContact } from '../../templates/mail.contact.mail'
import { EmailConfirmTemplate } from '../../templates/mail.confirm.mail';


// components
import * as FormComponent from "../../components/Form/Form.component.jsx"
import { TitleTextComponent } from "../../components/Text/Text.component"
import { Button } from "../../components/Button/Button"
import { Link } from '../../components/Button/Button';

// icons
import { AiOutlineMail, AiFillPhone, AiOutlineSend } from 'react-icons/ai';
import { BiSolidMap, BiLogoLinkedin } from 'react-icons/bi';

// context
import { useAlert } from '../../context/alert.context';

//config
import { MailDefault } from '../../config.jsx';

// data
import { CONTACT_EMAIL } from '../../data.jsx'

import {DotGridEffect} from '../../styles/effect.jsx'

export const ContactContainer = ({ id }) => {
    //ALERT
    const { addAlert } = useAlert();

    //REF FORM
    const captchaComponentRef = useRef();
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    const [output, setOutput] = useState(MailDefault)

    //CoolDown send
    const [IsCoolDown, SetIsCoolDown] = useState(false)
    const [CoolDownTime, SetCoolDownTime] = useState(0)
 

    const handleChange = (e) => {
        setOutput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }


    const handleReset = (e) => {
        setOutput(MailDefault);
        captchaComponentRef.current.handleReset();
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const SendEmail = async (content) => {
        const data = await sendEmail(content);
        if (!data) {
            addAlert("Une erreur s'est produite lors de l'envoi de l'e-mail.", "#cc3300", 4000);
            return false;
        }
        if (data.error && data.status === 429) {
            addAlert("Serveur surchargé. Veuillez réessayer dans quelques minutes.", "#ff9900", 5000);
            return false;
        }
        if (data.success) return true;
        addAlert('Message non envoyé', "#ffcc00", 4000);
        return false;
    }

    const CheckData = (output) => {
        if (!output.email || !isValidEmail(output.email)) {addAlert('Veuillez saisir une adresse email valide.', "#cc3300", 4000); return false;}

        if (!output.firstName) {addAlert('Veuillez saisir votre prénom.', "#cc3300", 4000);return false;}

        if (!output.message) {addAlert('Veuillez saisir votre message.', "#cc3300", 4000); return false;}

        return true
    }


    const handleSubmit = async (e) => {

        if (!isCaptchaValid) {addAlert('Captcha invalide.', "#cc3300", 4000); return false;}

        if (CheckData(output)) {
            let subjectFormat = 'Demande de contact de ';

            if (output.firstName) {subjectFormat += `${output.firstName}`;}

            if (output.lastName) {
                if (output.firstName) { subjectFormat += ' '; }
                subjectFormat += `${output.lastName}`;
            }

            subjectFormat = subjectFormat.trim();

            const contentMessage_webmaster = renderToString(
                <EmailTemplateContact
                    content={output.message}
                    title="Formulaire de contact"
                    email={output.email}
                    FullName={subjectFormat} />
            );

            const output_format_webmaster = {
                to: CONTACT_EMAIL,
                subject: subjectFormat,
                content: contentMessage_webmaster,
            };

            const webmasterEmailSent = await SendEmail(output_format_webmaster);

            if (webmasterEmailSent) {
                const output_format_client = {
                    to: output.email,
                    subject: subjectFormat,
                    content: renderToString(<EmailConfirmTemplate />),
                };

                const clientEmailSent = await SendEmail(output_format_client);

                if (clientEmailSent) {
                    SetIsCoolDown(true);
                    SetCoolDownTime(10)

                    const CoolDownInterval = setInterval(() => {
                        SetCoolDownTime(prevCoolDownTime => {

                            if (prevCoolDownTime === 1) {
                                SetIsCoolDown(false);
                                clearInterval(CoolDownInterval);
                            }

                            return prevCoolDownTime - 1;
                        });
                    }, 1000);
                    addAlert('Message bien reçu 👌', "green", 3500);
                    handleReset()
                } else { addAlert("Erreur lors de l'envoi de l'e-mail de confirmation au client.", "#cc3300", 4000); }
            } else {
                addAlert('Message non envoyé', "#ffcc00", 4000);
            }
        }
    };


    return (
        <div id={id}>
            <TitleTextComponent
                subtitle={"A votre service"}
                style={{ width: "100%" }}
            >Me contacter</TitleTextComponent>
            <styled.Container>
                <styled.Info>
                <DotGridEffect
                    $isHovered={true}
                    $DotColor="#feffff5a"
                    $Spacing="18px"
                    $DotSize="2px"/>
                    
                    <div className="content">
                        <div className="title">
                            <h2>Information</h2>
                            <span>Une idée ? Un projet ? N'hésitez pas à demander !</span>
                        </div>
                        <div className="container">
                            <Link className="ItemInfo" href="tel:0603420204" >
                                <AiFillPhone />
                                <div >
                                    <span className='name'>Telephone</span>
                                    <span className='info'>+33 6.03.42.02.04</span>
                                </div>
                            </Link>
                            <Link className="ItemInfo" href="mailto:pro.jonathan.gleyze@gmail.com" >
                                <AiOutlineMail />
                                <div>
                                    <span className='name'>Email</span>
                                    <span className='info'>pro.jonathan.gleyze@gmail.com</span>
                                </div>
                            </Link>
                            <Link className="ItemInfo" >
                                <BiSolidMap />
                                <div>
                                    <span className='name'>Location</span>
                                    <span className='info'>Nîmes (GARD)</span>
                                </div>
                            </Link>
                            <Link className="ItemInfo" href="https://www.linkedin.com/in/jonathan-gleyze-173ab7239/" >
                                <BiLogoLinkedin />
                                <div>
                                    <span className='name'>LinkedIn</span>
                                    <span className='info'>Jonathan gleyze</span>
                                </div>
                            </Link>

                        </div>
                        <div className='bottom'>
                            <span>Les informations avec une * sont obligatoire</span>
                        </div>
                    </div>
                </styled.Info>

                <styled.ContactForm>
                    <h2>Envoyer un message</h2>
                    <FormComponent.Groupe >
                        <FormComponent.Inline>
                            <FormComponent.InputText
                                name="firstName"
                                value={output.firstName}
                                onChange={handleChange}
                                label="Prénom"
                                placeHolder="john"
                                required
                            />
                            <FormComponent.InputText
                                name="lastName"
                                value={output.lastName}
                                onChange={handleChange}
                                label="Nom"
                                placeHolder="doe"
                            />
                        </FormComponent.Inline>

                        <FormComponent.InputEmail
                            name="email"
                            value={output.email}
                            onChange={handleChange}
                            placeHolder="secteur@domaine.fr"
                            label="Email"
                            required
                        />

                        <FormComponent.InputTextArea
                            name="message"
                            value={output.message}
                            onChange={handleChange}
                            label="message"
                            placeHolder="Ex. Salut, je veux créer un site web pour mes pingouins que chante du heavy metal. 🐧🤟 comment vous pouvez m'aider !"
                            required
                        />

                    </FormComponent.Groupe>

                    <FormComponent.CaptchaComponent
                        ref={captchaComponentRef}
                        isCaptchaValid={isCaptchaValid}
                        setIsCaptchaValid={setIsCaptchaValid} />

                    <styled.ActionForm>
                        <span className='resetForm' onClick={() => { handleReset() }}>Remettre a  zero</span>
                        {!IsCoolDown ? 
                            <Button
                                onClick={() => { handleSubmit() }}
                                icon={!IsCoolDown && <AiOutlineSend />}
                                disabled={IsCoolDown}
                                className="sendButton"
                            >
                            envoyer</Button> : 
                            <span className='colored'>{CoolDownTime}</span>
                        }
                    </styled.ActionForm>
                </styled.ContactForm>
            </styled.Container>
        </div>
    )
}