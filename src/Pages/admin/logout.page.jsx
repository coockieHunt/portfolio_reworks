import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useAlert } from '../../context/alert.context';


export const LogoutPage = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate(); 
    const { addAlert } = useAlert();


    const handleLogout = () => {
        logout();
        navigate('/admin/login'); 
        addAlert(
            'Bien deconnectée',
            "#2a8002",
            4000
        );
    };

    return (
        <div>
            <p>Vous êtes sur la page de déconnexion. Cliquez pour vous déconnecter.</p>
            <button onClick={handleLogout}>Déconnexion</button>
        </div>
    );
}

export default LogoutPage;
