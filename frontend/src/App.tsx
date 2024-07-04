import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { IndexPage } from './pages';
import { LoginPage } from './pages/auth/login';
import { AuthProvider } from './hooks/AuthContext';
import { AccountIndexPage } from './pages/account';
import { RoleIndexPage } from './pages/role';
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
            <Route path="/role" element={<RoleIndexPage/>} />
            <Route path="/connection" element={<ConnectionPage/>} />
            <Route path="*" element={<ErrorNotFoundPage/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
