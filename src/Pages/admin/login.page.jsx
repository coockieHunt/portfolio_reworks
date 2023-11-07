import { useState, useContext, useEffect } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { Form, Info, Container } from "./style/login.style";
// Component
import { Button } from "../../components/Buttton/Button.component"
import * as FormComponent from "../../components/Form/From.component"
import {CardComponent} from '../../components/Card/Card.component'
import { AccentTextComponent } from "../../components/Text/Text.component";

// config
import { API_URL, SCREEN_SIZE } from "../../config";

// Context
import { AuthContext } from '../../context/auth.context';
import { useAlert } from '../../context/alert.context';

// Hook
import {useWindowSize} from "../../hooks/screenResize.hook"

export const AdminLoginPage = () => {
    const { login, isAuthenticated } = useContext(AuthContext);
    const { addAlert } = useAlert();
    const navigate = useNavigate(); 

    const isMobile = useWindowSize(
        SCREEN_SIZE.mobile.substring(0, SCREEN_SIZE.mobile.length - 2),
    );


    let DefaultValue = {
        email: '',
        password: '',
    }
    const [output, setOutput] = useState(DefaultValue)


    const handleChange = (e) => {
        setOutput(prev => (
            { ...prev, [e.target.name]: e.target.value }
        ));
    }

    const handleSubmit = async () => {
        const { email, password } = output;
    
        const data = {
          username: email,
          password: password,
        };

        if (!email || !password) {
            addAlert(
                'Merci de remplir tous les champs',
                '#b30600',
                4000
            );
            return;
        }
    
        axios
          .post(API_URL.Login, data)
            .then((response) => {
                if(response.data.success){
                    const { user, token } = response.data;
                    login(user, token);
                    addAlert(
                        'Connexion réussie',
                        "#2a8002",
                        4000
                    );
                    navigate('/admin'); 
                }else{
                    addAlert(
                        'Identifiants invalides. Veuillez vérifier votre email et votre mot de passe.',
                        "#b30600",
                        4000
                    );
                }
            })
            .catch((error) => {
                console.error('Erreur lors de la requête POST :', error);
                addAlert(
                    'Identifiants invalides. Veuillez vérifier votre email et votre mot de passe.',
                    "#b30600",
                    4000
                );
            });
      };
    
    return (
        <Container>
            <CardComponent 
                highlightRight={true}
                width= {70}
                height={isMobile ? 'auto' : '50Vh'}
                leftWidth= {40}
                flexDirection={isMobile ? 'column' : 'row'}
                singleColumn={false}
                leftContent={
                    <Form>
                        <h2><AccentTextComponent>Conection aux panel admin</AccentTextComponent></h2>
                        <FormComponent.Groupe>
                            <FormComponent.InputEmail
                            name="email"
                            value={output.email}
                            onChange={handleChange}
                            placeHolder="secteur@domaine.fr"
                            label="email"
                            required
                            />

                            <FormComponent.InputText
                            name="password"
                            value={output.password}
                            onChange={handleChange}
                            label="password"
                            placeHolder="*****"
                            required
                            />

                        </FormComponent.Groupe>

                        <div className="action">
                            <Button
                                onClick={() => { handleSubmit() }}
                            >connection</Button>
                        </div>
                    </Form>
                }

                rightWidth= {60}
                rightContent={
                    <Info>
                        <h3>Connexion au Panel Administratif</h3>
                        <p>Email : Email du compte<br/>
                        Mot de passe : mot de passe du compte</p>
                        <p>Besoin d'aide ? Contactez-nous à pro.jonathan.gleyze@gmail.com
                        Si vous souhaitez voir à quoi cela ressemble, envoyez moi un e-mail.</p>
                    </Info>
                }
            />
        </Container>
    )
}