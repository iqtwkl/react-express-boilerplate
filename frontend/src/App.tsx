import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { IndexPage } from './pages';
import { LoginPage } from './pages/auth/login';
import { AuthProvider } from './hooks/Auth.provider';
import { AccountIndexPage } from './pages/account';
import { GroupIndexPage } from './pages/group';
import { ProfilePage } from './pages/account/profile';
import { DashboardDetailPage } from './pages/dashboard/detail';
import { ConnectionPage } from './pages/connection';
import { AppStateProvider } from './hooks/AppState.provider';
import { CrudStateProvider } from './hooks/CrudState.provider';
import ProtectedRoute from './components/common/ProtectedRoute';
import { ErrorNotFoundPage } from './pages/404';
import { ErrorUnauthorizedPage } from './pages/403';

function App() {
  return (
    <AppStateProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/auth/login" element={<LoginPage/>} />
            <Route path="/account" element={
              <ProtectedRoute element={
                <CrudStateProvider>
                  <AccountIndexPage />
                </CrudStateProvider>
              } />
            } />
            <Route path="/account/profile" element={<ProfilePage/>} />
            <Route path="/group" element={
                <ProtectedRoute element={
                  <CrudStateProvider>
                    <GroupIndexPage/>
                  </CrudStateProvider>
                } />
              } />
            <Route path="/dashboard/:id" element={<DashboardDetailPage/>} />
            <Route path="/connection" element={<ConnectionPage/>} />
            <Route path="/403" element={<ErrorUnauthorizedPage/>} />
            <Route path="*" element={<ErrorNotFoundPage/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </AppStateProvider>
  )
}

export default App
