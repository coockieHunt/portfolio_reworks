import { 
    Container, 
    Logo ,
    Logout
} from './AdminPanel.style'
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/alert.context';
import { AiOutlineLogout } from 'react-icons/ai';


// logo
import brand_logo from '../../image/main_logo.svg'

// Context
import { AuthContext } from '../../context/auth.context';



export const AdminPanelContainer = ({children}) => {
    const { user, login, logout } = useContext(AuthContext);
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
        <>
            <Container>
                <div className='left'>
                    <Logo src={brand_logo} 
                        alt="brand_logo"
                        onClick={
                        () => navigate('/')
                        }
                    />
                    <span>Admin panel</span>
                </div>
                <div className='right'>
                    {user && 
                        <>
                            <span>{user.FirstName} {user.LastName}</span>
                            <Logout onClick={() => handleLogout()}>
                                <AiOutlineLogout/>
                            </Logout>
                        </>
                    }
                </div>

            </Container>
            {children}
        </>

    )
}