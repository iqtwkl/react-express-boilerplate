import { useEffect, useState } from 'react';
import { ApplicationError } from '../../components/common/error';
import RootLayout from '../../components/layouts/layout';
import LoadingComponent from '../../components/common/loading';
import { GroupAPI } from '../../services/api/group';
import { useAuth } from '../../hooks/Auth.hooks';
import { GroupInterface } from '../../components/entity/group';
import CrudTableComponent from '../../components/common/table/crud';
import { CreateModal, DeleteModal, EditModal } from './modal';
import { useAppState } from '../../hooks/AppState.hooks';
import { useCrudState } from '../../hooks/CrudState.hooks';
import { crudAction, otherAction } from './action';

export function GroupIndexPage() {
    const { setError, setIsError } = useAppState();
    const [loading, setLoading] = useState(true);
    const { 
        setIsCreate, setIsSuccess,
        setIsDelete, setIsEdit
    } = useCrudState();

    const { token } = useAuth();
    const api = new GroupAPI(token);

    const [data, setData] = useState<GroupInterface[]>([]);
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

    const handleEdited = async () => {
        try {
            if (group) {
                const response = await api.update(group.id, group);
                setGroup(response);
                setIsSuccess(true);
                getData();
            } else {
                throw new ApplicationError(500, 'Group not edited');
            }
        } catch (error: unknown) {
            setError(error as ApplicationError);
            setIsError(true);
            setIsCreate(false);
        } finally {
            setGroup(undefined);
            setTimeout(() => {
                setIsSuccess(false);
                setIsEdit(false);
            }, 1234);
        }
    }

    const handleDeleted = async () => {
        try {
            if (group) {
                const response = await api.delete(group.id);
                setGroup(response);
                setIsSuccess(true);
                getData();
            } else {
                throw new ApplicationError(500, 'No Account Selected');
            }
        } catch (error: unknown) {
            setError(error as ApplicationError);
            setIsError(true);
            setIsDelete(false);
        } finally {
            setGroup(undefined);
            setTimeout(() => {
                setIsSuccess(false);
                setIsDelete(false);
            }, 1234);
        }
    }

    useEffect(() => {
        getData();
    }, []);


    const columnConfig = [
        { header: 'Group Name', accessor: 'name', asIs: false },
        { header: '', body: otherAction, asIs: true },
        { header: '', body: (group: GroupInterface) => crudAction(group, setGroup), asIs: true }
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
                    handleSave={handleCreated} 
                    setGroup={setGroup}
                />
                <EditModal
                    handleSave={handleEdited}
                    group={group}
                    setGroup={setGroup} 
                />
                <DeleteModal
                    handleSave={handleDeleted}
                    group={group}
                    setGroup={setGroup} 
                />
            </RootLayout>
        </>
    )
}