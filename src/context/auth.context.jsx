import React, { createContext, useState, useEffect } from 'react';

/**
 * Authentication context for the application.
 * @type {object}
 * @property {object} user - Information of the authenticated user.
 * @property {string} token - User's authentication token.
 * @property {function} login - Function to log in a user and store authentication information.
 * @property {function} logout - Function to log out a user.
 * @property {function} isAuthenticated - Function to check if a user is authenticated.
 */
export const AuthContext = createContext();

/**
 * AuthProvider component that provides the authentication context.
 * @param {object} props - Component properties.
 * @param {React.ReactNode} props.children - Child components that will access the authentication context.
 * @returns {React.ReactNode} The AuthProvider component.
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken'));

    /**
     * Function to log in a user and store authentication information.
     * @param {object} userData - User information.
     * @param {string} authToken - Authentication token.
     * @returns {void}
     */
    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    
    /**
     * Function to log out a user.
     * @returns {void}
     */
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
    };

     /**
     * Function to check if a user is authenticated.
     * @returns {boolean} True if the user is authenticated, otherwise False.
     */
    const isAuthenticated = () =>{
        console.log(user)
        return !!token
    }

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setUser(userData);
        }
    }, []);


    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
