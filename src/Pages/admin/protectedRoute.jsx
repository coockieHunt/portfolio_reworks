import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute component for securing routes.
 * @param {object} props - Component properties.
 * @param {React.ReactNode} props.element - The content of the protected route.
 * @returns {React.ReactNode} The ProtectedRoute component.
 */
export const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated()) {
        return <Navigate to="/admin/login" />;
    }

    return element;
};
