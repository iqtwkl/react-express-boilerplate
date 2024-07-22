import { Button } from "flowbite-react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { AccountInterface } from "../../components/entity/account";
import { useCrudState } from "../../hooks/CrudState.hooks";

export const crudAction = (account: AccountInterface, setAccount: (account: AccountInterface) => void) => {
    const { setIsDelete, setIsEdit } = useCrudState();

    const handleDelete = (account: AccountInterface) => {
        setAccount(account);
        setIsDelete(true);
    }

    const handleEdit = (account: AccountInterface) => {
        setAccount(account);
        setIsEdit(true);
    }

    return (
        <div className='flex justify-end'>
            <Button pill outline className="mr-2" onClick={() => handleEdit(account)}>
              <AiFillEdit className="h-4 w-4" />
            </Button>
            <Button pill outline color="failure" onClick={() => handleDelete(account)}>
              <AiFillDelete className="h-4 w-4" />
            </Button>
        </div>
    );
};