import { useContext } from 'react';
import { AppStateContext } from './AppState.context';

export const useAppState = () => {
    const context = useContext(AppStateContext);
    if(!context) {
        throw new Error('useAppState must be used within an AppStateContext Provider');
    }
    return context;
}