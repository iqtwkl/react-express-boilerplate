import { createContext } from "react";


type CrudStateContextType = {
    isCreate: boolean;
    setIsCreate: (isCreate: boolean) => void;
    isEdit: boolean;
    setIsEdit: (isEdit: boolean) => void;
    isDelete: boolean;
    setIsDelete: (isDelete: boolean) => void;
    isSuccess: boolean;
    setIsSuccess: (isSuccess: boolean) => void;
}

export const CrudStateContext = createContext<CrudStateContextType | undefined>(undefined);