import { createContext } from 'react';



type AppStateContextType = {
    isError: boolean;
    setIsError: (isError: boolean) => void;
    error: Error;
    setError: (error: Error) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

