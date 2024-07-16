import RootLayout from '../../components/layouts/layout';
import { Button } from "flowbite-react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from 'react';
import LoadingComponent from '../../components/common/loading';
import { AccountAPI } from '../../services/api/account';
import { useAuth } from '../../hooks/AuthContext';
import { AccountInterface } from '../../components/entity/account';
import { CreateModal, DeleteModal, EditModal } from './modal';
import CrudTableComponent from '../../components/common/table/crud';
import { ApplicationError } from '../../components/common/error';

export function AccountIndexPage() {
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<ApplicationError>(Object);
    const [loading, setLoading] = useState(true);
    const [accounts, setAccounts] = useState<AccountInterface[]>([]);
    const { token } = useAuth();
    const [ isCreate, setIsCreate ] = useState(false);
    const [ isEdit, setIsEdit ] = useState(false);
    const [ isDelete, setIsDelete ] = useState(false);
    const [ isSuccess, setIsSuccess ] = useState(false);
    const [ account, setAccount ] = useState<AccountInterface | undefined>(undefined);
    const api = new AccountAPI(token);

    const breadcrumbList = [
        { href: '', name: 'Account' },
    ];

    const crudAction = (account: AccountInterface) => {
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

    const handleDelete = (account: AccountInterface) => {
        setAccount(account);
        setIsDelete(true);
    }

    const handleEdit = (account: AccountInterface) => {
        setAccount(account);
        setIsEdit(true);
    }

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
        } catch (error: any) {
            setError(error);
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
        } catch (error: any) {
            setError(error);
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
        } catch (error: any) {
            setError(error);
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
        } catch (error: any) {
            setError(error);
            setIsError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getDataAccount();
    }, []);

    const columnConfig = [
        { header: 'User Name', accessor: 'username' },
        { header: 'Email', accessor: 'email' },
        { header: '', body: crudAction, asIs: true } 
    ];

    return (
        <>
            <RootLayout breadcrumbList={breadcrumbList} title='Account' error={error} isError={isError} setIsError={setIsError}>
                {
                    loading ? <LoadingComponent/> : <CrudTableComponent columnConfig={columnConfig} data={accounts} setIsCreate={setIsCreate} />
                }
                <CreateModal isOpen={isCreate} setIsOpen={setIsCreate} handleSave={handleCreated} isSuccess={isSuccess} setIsSuccess={setIsSuccess} setAccount={setAccount}/>
                <EditModal isOpen={isEdit} setIsOpen={setIsEdit} account={account} handleSave={handleEdited} isSuccess={isSuccess} setIsSuccess={setIsSuccess} setAccount={setAccount}/>
                <DeleteModal isOpen={isDelete} setIsOpen={setIsDelete} account={account} handleSave={handleDeleted} isSuccess={isSuccess} setIsSuccess={setIsSuccess} setAccount={setAccount} />
            </RootLayout>
        </>
    )
}