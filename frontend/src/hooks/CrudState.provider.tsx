import React, { useState } from 'react';
import { CrudStateContext } from './CrudState.context';

interface CrudStateProviderProps {
    children: React.ReactNode;
}

export const CrudStateProvider: React.FC<CrudStateProviderProps> = ({children}) => {
    const [ isCreate, setIsCreate ] = useState(false);
    const [ isEdit, setIsEdit ] = useState(false);
    const [ isDelete, setIsDelete ] = useState(false);
    const [ isSuccess, setIsSuccess ] = useState(false);

    return (
        <CrudStateContext.Provider value={{
            isCreate,
            setIsCreate,
            isEdit,
            setIsEdit,
            isDelete,
            setIsDelete,
            isSuccess,
            setIsSuccess,
        }}>
            {children}
        </CrudStateContext.Provider>
    )
}