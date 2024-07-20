import React, { useEffect, useState } from 'react';
import { AccountSessionInterface } from '../components/entity/account';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.context';

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
    });
    const [token, setToken] = useState<string>(() => {
        return localStorage.getItem('token') || '';
    });
    const [loggedUser, setLoggedUser] = useState<AccountSessionInterface>(
        {
            id: '0', 
            username: 'Guest', 
            fullName: 'Guest User', 
            email: 'guest@user.com'
        }
    );

    const setUserFromToken = (token: string) => {
        if(token == '') {
            setLoggedUser({
                id: '0', 
                username: 'Guest', 
                fullName: 'Guest User', 
                email: 'guest@user.com'
            });
        }

        const tokenPayload = jwtDecode(token) as AccountSessionInterface;
        setLoggedUser({
            id: tokenPayload.id, 
            username: tokenPayload.username, 
            fullName: tokenPayload.fullName, 
            email: tokenPayload.email
        });
    }

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        if (storedIsLoggedIn) {
            setIsLoggedIn(JSON.parse(storedIsLoggedIn));
        }

        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setUserFromToken(storedToken);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setToken('');
        return <Navigate to="/auth/login" />;
      };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn: setIsLoggedIn, token, setToken, logout, loggedUser, setLoggedUser, setUserFromToken }}>
            {children}
        </AuthContext.Provider>
    );
};
