import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { IndexPage } from './pages';
import { LoginPage } from './pages/auth/login';
import { AuthProvider } from './hooks/AuthContext.context';
import { AccountIndexPage } from './pages/account';
import { GroupIndexPage } from './pages/group';
import { ProfilePage } from './pages/account/profile';
import { DashboardDetailPage } from './pages/dashboard/detail';
import { ErrorNotFoundPage } from './pages/404';
import { ConnectionPage } from './pages/connection';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/auth/login" element={<LoginPage/>} />
            <Route path="/account" element={<AccountIndexPage/>} />
            <Route path="/account/profile" element={<ProfilePage/>} />
            <Route path="/group" element={<GroupIndexPage/>} />
            <Route path="/dashboard/:id" element={<DashboardDetailPage/>} />
            <Route path="/connection" element={<ConnectionPage/>} />
            <Route path="*" element={<ErrorNotFoundPage/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
