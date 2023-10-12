import React, {useState} from 'react';

import { 
    Container,
    Info,
    ContactForm,
    ActionForm,
    Title,
} from "./Contact.style"

import{
    CONTACT_EMAIL
} from '../../config'

import {useWindowSize} from "../../hooks/screenResize.hook"
import axios from 'axios';
import { renderToString } from 'react-dom/server';

import {EmailTemplateContact} from '../../templates/mail.contact.mail'


import * as FormComponent from "../../components/Form/From.component"
import {Button} from "../../components/Buttton/Button.component"
import {AccentTextComponent} from "../../components/Text/Text.component"
import { Link } from '../../components/Buttton/Button.component';

import { AiOutlineMail, AiFillPhone, AiOutlineSend } from 'react-icons/ai';
import { BiSolidMap } from 'react-icons/bi';

import { useAlert } from '../../context/alert.context';

export const ContactContainer = ({id}) => {
    const { addAlert } = useAlert();

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
    }


    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async(e) => {
        if (!output.email || !isValidEmail(output.email)) {
            addAlert({
                message: 'Veuillez saisir une adresse email valide.',
                colorAlert: "#cc3300",
                delay: 4000
            });
            return;
        }
    
        if (!output.firstName) {
            addAlert({
                message: 'Veuillez saisir votre prénom.',
                colorAlert: "#cc3300",
                delay: 4000
            });
            return;
        }
    
        if (!output.message) {
            addAlert({
                message: 'Veuillez saisir votre message.',
                colorAlert: "#cc3300",
                delay: 4000
            });
            return;
        }

        let subjectFormat = 'Demande de contact de ';

        if (output.firstName) {subjectFormat += `${output.firstName}`;}

        if (output.lastName) {
            if (output.firstName) {subjectFormat += ' ';}
            subjectFormat += `${output.lastName}`;
        }

        subjectFormat = subjectFormat.trim();

        const contentMessage = renderToString(
            <EmailTemplateContact 
                content={output.message} 
                title="Formulaire de contact" 
                email={output.email} 
                FullName={subjectFormat}/>
        );

        const output_format = {
          to: CONTACT_EMAIL,
          subject: subjectFormat, 
          message: contentMessage,
        };

        try {
          const response = await axios.post('https://api.jonathangleyze.fr/sendEmail', output_format);
                  
          if (response.data.success) {
            addAlert({
                message: 'Message bien reçu 👌',
                delay: 4000
            });
            setOutput(DefaultValue); 
          } else {
            console.log(response)
            addAlert({
                message: 'Message non evoyer',
                colorAlert: "#ffcc00",
                delay: 4000
            });
          }
        } catch (error) {
          console.error('Erreur lors de la requête POST vers le serveur:', error);
          addAlert({
            message: "Une erreur s'est produite lors de l'envoi de l'e-mail.",
            colorAlert: "#cc3300",
            delay: 4000
        });
        }
    };

    return(
        <div id={id}>
            <Title><AccentTextComponent>Me contacter</AccentTextComponent></Title>
            <Container>
                {!isMobile ?
                    <Info>
                        {/* <AlertConponent type="red" message='sqdsqdqsdsqdsd'/> */}
                        <div className="info">
                            <h1>Information</h1>
                            <p>Remplissez ce formulaire, je vous repondrais le plus rapidement possible.</p>
                        
                            <div className="contact">
                                <Link onClick={() => window.location.replace('https://bobbyhadz.com')}>
                                    <AiFillPhone/> 
                                    <span>+33 6.03.42.02.04</span>
                                </Link>
                                <Link>
                                    <AiOutlineMail/>
                                    <span
                                        onClick={() => window.location.replace('mailto:pro.jonathan.gleyze@gmail.com')}
                                    >pro.jonathan.gleyze@gmail.com</span>
                                </Link>
                                <Link>
                                    <BiSolidMap/>
                                    <span
                                        onClick={() => window.location.replace('https://www.google.com/maps/place/N%C3%AEmes/')}
                                    >Nîmes</span>
                                </Link>
                            </div>
                        </div>
                    
                        <div className='bottom'>
                            <span>À votre disposition pour toute question.</span>
                        </div>
                    </Info> :null
                }
            
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
                            label= "email"
                            required
                        />

                        <FormComponent.InputTextArea 
                            name="message"
                            value={output.message} 
                            onChange={handleChange}
                            label= "message"
                            placeHolder="Ex. Salut, je veux créer un site web pour mes pingouins que chante du heavy metal. 🐧🤟 comment vous pouvez m'aider !"
                            required
                        />

                    </FormComponent.Groupe>
                    <ActionForm>
                            <span onClick={() => {handleReset()}}>Remettre a  zero</span>
                            <Button 
                                onClick={() => {handleSubmit()}}
                                icon={<AiOutlineSend/>}
                            >Envoyer</Button>

                    </ActionForm>
                </ContactForm>
            </Container>
        </div>
    )
}