import { useContext } from 'react';
import { AppStateContext } from './AppState.context';

export const useAppState = () => {
    const context = useContext(AppStateContext);
    if(!context) {
        throw new Error('useError must be used within an ErrorContext Provider');
    }
    return context;
}