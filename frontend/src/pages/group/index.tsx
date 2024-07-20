import { useEffect, useState } from 'react';
import { ApplicationError } from '../../components/common/error';
import RootLayout from '../../components/layouts/layout';
import LoadingComponent from '../../components/common/loading';
import { GroupAPI } from '../../services/api/group';
import { useAuth } from '../../hooks/Auth.hooks';
import { GroupInterface } from '../../components/entity/group';
import { Button } from 'flowbite-react';
import { 
    AiFillEdit, 
    AiFillDelete, 
    AiOutlineUserAdd, 
    AiTwotoneDashboard 
} from "react-icons/ai";
import CrudTableComponent from '../../components/common/table/crud';
import { CreateModal } from './modal';
import { useAppState } from '../../hooks/AppState.hooks';

export function GroupIndexPage() {
    const { setError, setIsError } = useAppState()
    const [loading, setLoading] = useState(true);

    const { token } = useAuth();
    const api = new GroupAPI(token);

    const [data, setData] = useState<GroupInterface[]>([]);
    const [ isCreate, setIsCreate ] = useState(false);
    const [ isSuccess, setIsSuccess ] = useState(false);
    const [ group, setGroup ] = useState<GroupInterface | undefined>(undefined);

    const getData = async (search = '', searchBy = '') => {
        setLoading(true);
        try {
            const response = await api.getAll(1, 10, search, searchBy);
            setData(response);
        } catch (error: unknown) {
            setError(error as ApplicationError);
            setIsError(true);
        } finally {
            setLoading(false);
        }
    }

    const handleCreated = async () => {
        try {
            if (group) {
                const response = await api.create(group);
                setGroup(response);
                setIsSuccess(true);
                getData();
            } else {
                throw new ApplicationError(500, 'Group not created');
            }
        } catch (error: unknown) {
            setError(error as ApplicationError);
            setIsError(true);
            setIsCreate(false);
        } finally {
            setGroup(undefined);
            setTimeout(() => {
                setIsSuccess(false);
                setIsCreate(false);
            }, 1234);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const crudAction = (group: GroupInterface) => {
        return (
            <div className='flex justify-end'>
                <Button pill outline className="mr-2" onClick={() => { }}>
                    <AiFillEdit className="h-4 w-4" />
                </Button>
                <Button pill outline color="failure" onClick={() => { }}>
                    <AiFillDelete className="h-4 w-4" />
                </Button>
            </div>
        );
    };

    const otherAction = (group: GroupInterface) => {
        return (
            <div className='flex justify-end'>
                <Button pill outline className="mr-2" onClick={() => { }}>
                    <AiOutlineUserAdd className="h-4 w-4" />
                </Button>
                <Button pill outline onClick={() => { }}>
                    <AiTwotoneDashboard className="h-4 w-4" />
                </Button>
            </div>
        );
    };


    const columnConfig = [
        { header: 'Group Name', accessor: 'name', asIs: false },
        { header: '', body: otherAction, asIs: true },
        { header: '', body: crudAction, asIs: true }
    ];

    return (
        <>
            <RootLayout title='Groups'>
                {
                    loading ? <LoadingComponent />
                        : <CrudTableComponent 
                            columnConfig={columnConfig} 
                            data={data} 
                            setIsCreate={setIsCreate} 
                        />
                }
                <CreateModal 
                    isOpen={isCreate} 
                    setIsOpen={setIsCreate} 
                    handleSave={handleCreated} 
                    isSuccess={isSuccess} 
                    setIsSuccess={setIsSuccess} 
                    setGroup={setGroup}
                />
            </RootLayout>
        </>
    )
}