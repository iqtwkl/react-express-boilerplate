/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/Auth.hooks';
import { ErrorUnauthorizedPage } from '../../pages/403';
import LoadingComponent from './loading';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { loggedUser, isLoggedIn, token } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (loggedUser !== undefined) {
            setIsLoading(false);
        }
    }, [loggedUser]);

    if (!isLoggedIn && !token) {
        return <Navigate to="/auth/login" />;
      }
    
    return (
    <>  
        {isLoading ? <LoadingComponent /> : loggedUser.is_admin ? element : <ErrorUnauthorizedPage/>}
    </>);
};

export default ProtectedRoute;
