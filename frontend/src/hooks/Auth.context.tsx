import { createContext } from 'react';
import { AccountSessionInterface } from '../components/entity/account';

type AuthContextType = {
    isLoggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
    token: string;
    setToken: (token: string) => void;
    loggedUser: AccountSessionInterface;
    setLoggedUser: (loggedUser: AccountSessionInterface) => void;
    logout: () => void;
    setUserFromToken: (token: string) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
