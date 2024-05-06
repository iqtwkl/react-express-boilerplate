// import '../App.css';
import { Navigate } from 'react-router-dom';
import RootLayout from '../components/layouts/layout';
import { useAuth } from '../hooks/AuthContext';

export function IndexPage() {
  const breadcrumbList = [
    { href: '', name: 'Dashboard' },
  ];
  const { isLoggedIn, token } = useAuth();

  if (!isLoggedIn && !token) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <RootLayout breadcrumbList={breadcrumbList} title='Dashboard'>
        <h1>Dashboard</h1>
        <div>
            <p>chart</p>
        </div>
    </RootLayout>
  ) 
}