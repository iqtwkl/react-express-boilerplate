import { Button } from "flowbite-react";
import { GroupInterface } from "../../components/entity/group";
import { 
    AiFillEdit, 
    AiFillDelete, 
    AiOutlineUserAdd, 
    AiTwotoneDashboard 
} from "react-icons/ai";
import { useCrudState } from "../../hooks/CrudState.hooks";

interface ActionProps {
    group: GroupInterface | undefined;
    setGroup: (group: GroupInterface | undefined) => void;
}   

export const crudAction = (group: GroupInterface, setGroup: (group: GroupInterface) => void) => {
    const { setIsDelete, setIsEdit } = useCrudState();

    const handleDelete = (group: GroupInterface) => {
        setGroup(group);
        setIsDelete(true);
    }
    
    const handleEdit = (group: GroupInterface) => {
        setGroup(group);
        setIsEdit(true);
    }

    return (
        <div className='flex justify-end'>
            <Button pill outline className="mr-2" onClick={() => handleEdit(group)}>
                <AiFillEdit className="h-4 w-4" />
            </Button>
            <Button pill outline color="failure" onClick={() => handleDelete(group)}>
                <AiFillDelete className="h-4 w-4" />
            </Button>
        </div>
    );
};

interface OtherActionProps extends ActionProps {
    setIsAddAccount: (isAddAccount: boolean) => void;
    setIsAddDashboard: (isAddDashboard: boolean) => void;
}

export const otherAction = (props: OtherActionProps) => {
    const { group, setGroup, setIsAddAccount,setIsAddDashboard} = props;

    const handleAddAccount = (group: GroupInterface) => {
        setGroup(group);
        setIsAddAccount(true);
    }
    
    const handleAddDashboard = (group: GroupInterface) => {
        setGroup(group);
        setIsAddDashboard(true);
    }

    return (
        <div className='flex justify-end'>
            <Button pill outline className="mr-2" onClick={() => handleAddAccount(group)}>
                <AiOutlineUserAdd className="h-4 w-4" />
            </Button>
            <Button pill outline onClick={() => handleAddDashboard(group)}>
                <AiTwotoneDashboard className="h-4 w-4" />
            </Button>
        </div>
    );
};



