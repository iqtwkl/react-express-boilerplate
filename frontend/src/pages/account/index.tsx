import RootLayout from '../../components/layouts/layout';
import { useEffect, useState } from 'react';
import LoadingComponent from '../../components/common/loading';
import { AccountAPI } from '../../services/api/account';
import { useAuth } from '../../hooks/Auth.hooks';
import { AccountInterface } from '../../components/entity/account';
import { CreateModal, DeleteModal, EditModal } from './modal';
import CrudTableComponent from '../../components/common/table/crud';
import { ApplicationError } from '../../components/common/error';
import { useCrudState } from '../../hooks/CrudState.hooks';
import { crudAction } from './action';
import { useAppState } from '../../hooks/AppState.hooks';

export function AccountIndexPage() {
    const { setError, setIsError } = useAppState();
    const [loading, setLoading] = useState(true);
    
    const { token } = useAuth();
    const { 
        setIsCreate, setIsEdit, 
        setIsDelete, setIsSuccess
    } = useCrudState();

    const [accounts, setAccounts] = useState<AccountInterface[]>([]);
    const [ account, setAccount ] = useState<AccountInterface | undefined>(undefined);
    const api = new AccountAPI(token);

    const handleEdited = async () => {
        try {
            if (account) {
                const response = await api.update(account.id, account);
                setAccount(response);
                setIsSuccess(true);
                getDataAccount();
            } else {
                throw new ApplicationError(500, 'No Account Selected');
            }
        } catch (error: unknown) {
            setError(error as ApplicationError);
            setIsError(true);
            setIsEdit(false);
        } finally {
            setAccount(undefined);
            setTimeout(() => {
                setIsSuccess(false);
                setIsEdit(false);
            }, 1234);
        }
    }

    const handleDeleted = async () => {
        try {
            if (account) {
                const response = await api.delete(account.id);
                setAccount(response);
                setIsSuccess(true);
                getDataAccount();
            } else {
                throw new ApplicationError(500, 'No Account Selected');
            }
        } catch (error: unknown) {
            setError(error as ApplicationError);
            setIsError(true);
            setIsDelete(false);
        } finally {
            setAccount(undefined);
            setTimeout(() => {
                setIsSuccess(false);
                setIsDelete(false);
            }, 1234);
        }
    }

    const handleCreated = async () => {
        try {
            if (account) {
                const response = await api.create(account);
                setAccount(response);
                setIsSuccess(true);
                getDataAccount();
            } else {
                throw new ApplicationError(500, 'No Account Set');
            }
        } catch (error: unknown) {
            setError(error as ApplicationError);
            setIsError(true);
            setIsCreate(false);
        } finally {
            setAccount(undefined);
            setTimeout(() => {
                setIsSuccess(false);
                setIsCreate(false);
            }, 1234);
        }
    }

    const getDataAccount = async (search='', search_by='') => {
        setLoading(true);
        try {
            const response = await api.getAll(1,10,search,search_by);
            setAccounts(response);
        } catch (error: unknown) {
            setError(error as ApplicationError);
            setIsError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getDataAccount();
    }, []);

    const columnConfig = [
        { header: 'User Name', accessor: 'username', asIs: false },
        { header: 'Email', accessor: 'email', asIs: false },
        { header: '', body:(account: AccountInterface) => crudAction(account, setAccount), asIs: true } 
    ];

    return (
        <>
            <RootLayout title='Account'>
                {
                    loading ? <LoadingComponent/> 
                    : <CrudTableComponent 
                        columnConfig={columnConfig} 
                        data={accounts} 
                        setIsCreate={setIsCreate} 
                    />
                }
                <CreateModal 
                    handleSave={handleCreated}  
                    setAccount={setAccount}
                />
                <EditModal 
                    account={account} 
                    handleSave={handleEdited} 
                    setAccount={setAccount}
                />
                <DeleteModal 
                    account={account} 
                    handleSave={handleDeleted}
                    setAccount={setAccount} 
                />
            </RootLayout>
        </>
    )
}