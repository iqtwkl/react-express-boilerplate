import React, { useState } from 'react';
import { AppStateContext } from './AppState.context';

interface AppStateProviderProps {
    children: React.ReactNode;
}

export const ErrorProvider: React.FC<AppStateProviderProps> = ({ children }) => {
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<Error>(
        {
            name:'NoError',
            message:'OK'
        }
    );
    const [loading, setLoading] = useState(true);

    return (
        <AppStateContext.Provider value={{isError, setIsError, error, setError, loading, setLoading}}>
            {children}
        </AppStateContext.Provider>
    )
}