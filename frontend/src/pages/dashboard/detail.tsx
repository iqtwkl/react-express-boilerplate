import { Navigate } from 'react-router-dom';
import RootLayout from '../../components/layouts/layout'; 
import { useAuth } from '../../hooks/AuthContext.hooks'; 
import { useState } from 'react';
import { ApplicationError } from '../../components/common/error';

export function DashboardDetailPage() {
    const [isError, setIsError] = useState(false);
    const [error] = useState<ApplicationError>(Object);

    const breadcrumbList = [
        { href: '', name: 'DashboardDetail' },
    ];
    const { isLoggedIn, token } = useAuth();

    if (!isLoggedIn && !token) {
        return <Navigate to="/auth/login" />;
    }
    return (
        <>
            <RootLayout breadcrumbList={breadcrumbList} title='DashboardDetail' error={error} isError={isError} setIsError={setIsError}>
                <div></div>
            </RootLayout>
        </>
    )
}