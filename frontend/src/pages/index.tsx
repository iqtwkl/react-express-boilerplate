// import '../App.css';
import { Navigate } from 'react-router-dom';
import RootLayout from '../components/layouts/layout';
import { useAuth } from '../hooks/AuthContext';
import { useState } from 'react';
import { ApplicationError } from '../components/common/error';

export function IndexPage() {
  const [isError, setIsError] = useState(false);
  const [error] = useState<ApplicationError>(Object);
  const breadcrumbList = [
    { href: '', name: 'Dashboard' },
  ];
  const { isLoggedIn, token } = useAuth();

  if (!isLoggedIn && !token) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <RootLayout breadcrumbList={breadcrumbList} title='Dashboard' error={error} isError={isError} setIsError={setIsError}>
        <h1>Dashboard</h1>
        <div>
            <p>chart</p>
        </div>
    </RootLayout>
  ) 
}