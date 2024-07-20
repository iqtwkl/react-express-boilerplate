import React, { useState } from 'react';
import { AppStateContext } from './AppState.context';
import { ApplicationError } from '../components/common/error';

interface AppStateProviderProps {
    children: React.ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<ApplicationError>(
        {
            name:'NoError',
            message:'OK',
            status: 200
        }
    );

    return (
        <AppStateContext.Provider value={{isError, setIsError, error, setError}}>
            {children}
        </AppStateContext.Provider>
    )
}