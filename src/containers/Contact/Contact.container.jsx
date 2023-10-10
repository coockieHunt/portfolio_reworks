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
import axios, {isCancel, AxiosError} from 'axios';


import * as FormComponent from "../../components/Form/From.component"
import {Button} from "../../components/Buttton/Button.component"
import {AccentTextComponent} from "../../components/Text/Text.component"
import { Link } from '../../components/Buttton/Button.component';

import { AiOutlineMail, AiFillPhone, AiOutlineSend } from 'react-icons/ai';
import { BiSolidMap } from 'react-icons/bi';

export const ContactContainer = ({id}) => {
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

    const handleSubmit = async(e) => {

        let subjectFormat = 'Demande de contact de ';

        if (output.firstName) {subjectFormat += `${output.firstName}`;}

        if (output.lastName) {
            if (output.firstName) {subjectFormat += ' ';}
            subjectFormat += `${output.lastName}`;
        }

        subjectFormat = subjectFormat.trim();

        var emailHTML = `
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Votre E-mail</title>
            </head>
            <body>
                <table width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center" style="background-color: #f0f0f0; padding: 20px;">
                            <table width="600" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
                                        ${output.message}  
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `;

        
        const output_format = {
          to: CONTACT_EMAIL,
          subject: subjectFormat, 
          message: emailHTML
        };

        console.log(JSON.stringify(output_format));
      
        try {
          const response = await axios.post('https://api.jonathangleyze.fr/sendEmail', JSON.stringify(output_format));
                  
          if (response.data.success) {
            alert("L'e-mail a été envoyé avec succès.");
            setOutput(DefaultValue); 
          } else {
            console.log(response)
            alert("Une erreur s'est produite lors de l'envoi de l'e-mail.");
          }
        } catch (error) {
          console.error('Erreur lors de la requête POST vers le serveur:', error);
          alert("Une erreur s'est produite lors de l'envoi de l'e-mail.");
        }
    };

    return(
        <div id={id}>
            <Title><AccentTextComponent>Me contacter</AccentTextComponent></Title>
            <Container>
                {!isMobile ?
                    <Info>
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
                            placeHolder="Votre message ..."
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