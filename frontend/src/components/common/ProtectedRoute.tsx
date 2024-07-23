/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/Auth.hooks';
import { ErrorUnauthorizedPage } from '../../pages/403';
import LoadingComponent from './loading';

interface ProtectedRouteProps {
    element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { loggedUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (loggedUser !== undefined) {
            setIsLoading(false);
        }
    }, [loggedUser]);
    
    return (
    <>  
        {isLoading ? <LoadingComponent /> : loggedUser.is_admin ? element : <ErrorUnauthorizedPage/>}
    </>);
};

export default ProtectedRoute;
