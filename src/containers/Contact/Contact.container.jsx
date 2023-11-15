import React, { useState, useRef } from 'react';

import {
    Container,
    Info,
    ContactForm,
    ActionForm,
    Title,
    Text
} from "./Contact.style"

import {
    COLOR,
    CONTACT_EMAIL
} from '../../config'

import { useWindowSize } from "../../hooks/screenResize.hook"
import axios from 'axios';
import { renderToString } from 'react-dom/server';

import { EmailTemplateContact } from '../../templates/mail.contact.mail'
import { EmailConfirmTemplate } from '../../templates/mail.confirm.mail';


import * as FormComponent from "../../components/Form/From.component"
import { Button } from "../../components/Buttton/Button.component"
import { TitleTextComponenet } from "../../components/Text/Text.component"
import { Link } from '../../components/Buttton/Button.component';

import { AiOutlineMail, AiFillPhone, AiOutlineSend } from 'react-icons/ai';
import { BiSolidMap } from 'react-icons/bi';

import { useAlert } from '../../context/alert.context';


export const ContactContainer = ({ id }) => {
    const { addAlert } = useAlert();
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    const captchaComponentRef = useRef();


    let DefaultValue = {
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    }
    const [output, setOutput] = useState(DefaultValue)

    const isMobile = useWindowSize(1400);

    const handleChange = (e) => {
        setOutput(prev => (
            { ...prev, [e.target.name]: e.target.value }
        ));
    }


    const handleReset = (e) => {
        setOutput(DefaultValue);
        captchaComponentRef.current.handleReset();
    }


    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


    const SendEmail = async (content) => {
        try {
            const response = await axios.post('https://api.jonathangleyze.fr/api/sendEmail', content);

            if (response.data.success) {
                return true
            } else {
                console.log(response)
                addAlert(
                    'Message non evoyer',
                    "#ffcc00",
                    4000
                );

                return false

            }
        } catch (error) {
            console.error('Erreur lors de la requête POST vers le serveur:', error);
            addAlert(
                "Une erreur s'est produite lors de l'envoi de l'e-mail.",
                "#cc3300",
                4000
            );
            return false
        }
    }

    const CheckData = (output) => {
        if (!output.email || !isValidEmail(output.email)) {
            addAlert(
                'Veuillez saisir une adresse email valide.',
                "#cc3300",
                4000
            );
            return false;
        }

        if (!output.firstName) {
            addAlert(
                'Veuillez saisir votre prénom.',
                "#cc3300",
                4000
            );
            return false;
        }

        if (!output.message) {
            addAlert(
                'Veuillez saisir votre message.',
                "#cc3300",
                4000
            );
            return false;
        }

        return true
    }


    const handleSubmit = async (e) => {

        if (!isCaptchaValid) {
            addAlert(
                'Captcha invalide.',
                "#cc3300",
                4000
            );
            return;
        }

        if (CheckData(output)) {
            // Build subject
            let subjectFormat = 'Demande de contact de ';

            if (output.firstName) {
                subjectFormat += `${output.firstName}`;
            }

            if (output.lastName) {
                if (output.firstName) {
                    subjectFormat += ' ';
                }
                subjectFormat += `${output.lastName}`;
            }

            subjectFormat = subjectFormat.trim();

            // Build mail for the webmaster
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

            // Send email to the webmaster
            const webmasterEmailSent = await SendEmail(output_format_webmaster);

            if (webmasterEmailSent) {
                const output_format_client = {
                    to: output.email,
                    subject: subjectFormat,
                    content: renderToString(<EmailConfirmTemplate />),
                };

                const clientEmailSent = await SendEmail(output_format_client);

                if (clientEmailSent) {
                    addAlert(
                        'Message bien reçu 👌',
                        COLOR.primary,
                        3500
                    );
                    handleReset()
                } else {
                    addAlert(
                        "Erreur lors de l'envoi de l'e-mail de confirmation au client.",
                        "#cc3300",
                        4000
                    );
                }
            } else {
                addAlert(
                    'Message non envoyé',
                    "#ffcc00",
                    4000
                );
            }
        }
    };


    return (
        <div id={id}>
            <Title><TitleTextComponenet
                subtitle={"Avotre service"}
            >Me contacter</TitleTextComponenet></Title>
            <Container>
                    <Info>
                        <div className="info">
                            {!isMobile &&
                                <>
                                    <h2>Information</h2>
                                    <p>Remplissez ce formulaire, je vous repondrais le plus rapidement possible.</p>
                                </>
                            }
                            <div className="contact">
                                <Link className= "info" >
                                    <AiFillPhone />
                                    <span
                                        onClick={() => window.location.href = 'tel:0603420204'}
                                    >+33 6.03.42.02.04</span>
                                </Link>
                                <Link className= "info" >
                                    <AiOutlineMail />
                                    <span
                                        onClick={() => window.location.replace('mailto:pro.jonathan.gleyze@gmail.com')}
                                    >pro.jonathan.gleyze@gmail.com</span>
                                </Link>
                                <Link className= "info" >
                                    <BiSolidMap />
                                    <span
                                        onClick={() => window.location.href = 'https://www.google.com/maps/place/N%C3%AEmes/'}
                                    >Nîmes (GARD)</span>
                                </Link>
                            </div>
                        </div>

                        {!isMobile && <div className='bottom'>
                            <span>Les informations avec une * sont obligatoire</span>
                        </div>}
                    </Info>

                <ContactForm>
                    <FormComponent.Groupe >
                        <FormComponent.Inline>
                            <FormComponent.InputText
                                name="firstName"
                                value={output.firstName}
                                onChange={handleChange}
                                label="Prenom"
                                placeHolder="jhon"
                                required
                            />
                            <FormComponent.InputText
                                name="lastName"
                                value={output.lastName}
                                onChange={handleChange}
                                label="nom"
                                placeHolder="doe"
                            />
                        </FormComponent.Inline>

                        <FormComponent.InputEmail
                            name="email"
                            value={output.email}
                            onChange={handleChange}
                            placeHolder="secteur@domaine.fr"
                            label="email"
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

                    <ActionForm>
                        <span onClick={() => { handleReset() }}>Remettre a  zero</span>
                        <Button
                            onClick={() => { handleSubmit() }}
                            icon={<AiOutlineSend />}
                        >Envoyer</Button>
                    </ActionForm>
                </ContactForm>
            </Container>
        </div>
    )
}