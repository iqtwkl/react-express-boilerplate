import { useContext } from "react"
import { CrudStateContext } from "./CrudState.context"


export const useCrudState = () => {
    const context = useContext(CrudStateContext);
    if (!context) {
        throw new Error('useCrudState must be used within an CrudState provider');
    }
    return context;
}