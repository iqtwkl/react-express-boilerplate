import { createContext } from 'react';
import { ApplicationError } from '../components/common/error';


type AppStateContextType = {
    isError: boolean;
    setIsError: (isError: boolean) => void;
    error: ApplicationError;
    setError: (error: ApplicationError) => void;
}

export const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

