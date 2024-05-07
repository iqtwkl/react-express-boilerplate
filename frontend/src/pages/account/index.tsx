import RootLayout from '../../components/layouts/layout';
import { Button } from "flowbite-react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from 'react';
import LoadingComponent from '../../components/common/loading';
import TableComponent from '../../components/common/table';
import ErrorModalComponent from '../../components/common/error';
import { AccountAPI } from '../../services/api/account';
import { useAuth } from '../../hooks/AuthContext';
import { AccountInterface } from '../../components/entity/account';

export function AccountIndexPage() {
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [accounts, setAccounts] = useState([]);
    const { token } = useAuth();

    const breadcrumbList = [
        { href: '', name: 'Account' },
    ];

    const crudAction = (account: AccountInterface) => {
        return (
            <div className='flex'>
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
        console.log(account);
    }

    const handleEdit = (account: AccountInterface) => {
        console.log(account);
    }

    const getDataAccount = async (search='', search_by='') => {
        setLoading(true);
        try {
            const api = new AccountAPI(token);
            const response = await api.getAll(1,10,search,search_by);
            setAccounts(response);
        } catch (error) {
            setError(error.response.data.error);
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
        { header: 'Actions', body: crudAction, asIs: true } 
    ];

    return (
        <>
            <RootLayout breadcrumbList={breadcrumbList} title='Account'>
                {
                    loading ? <LoadingComponent/> : <TableComponent columnConfig={columnConfig} data={accounts} />
                }
                <ErrorModalComponent error={error} isError={isError} setIsError={setIsError} />
            </RootLayout>
        </>
    )
}