import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { CardComponent } from '../../components/Card/Card.component';
import { UserInfo} from './style/panel.style'


export const PanelPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate(); 

    return(
        <CardComponent width= {25}>
            <UserInfo>
                <h3>Information utilisiteur: </h3>
                <ul>
                    <li>Nom: {user.LastName} {user.FirstName}</li>
                    <li>Email: {user.Email}</li>
                </ul>
            </UserInfo>
        </CardComponent>
    )
}