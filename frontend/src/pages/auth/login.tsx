import React, { useState, useEffect } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { AuthAPI } from '../../services/api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import ErrorModalComponent, { ApplicationError } from "../../components/common/error";
import { AxiosError } from "axios";
import CreateAccount from "./signup";
import { LoginForm } from "./login_form";

export function LoginPage() {
    const navigate = useNavigate();
    const { isLoggedIn, setLoggedIn, token, setToken, setUserFromToken } = useAuth(); 
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<ApplicationError>(Object);
    const [showCreateAccount, setShowCreateAccount] = useState(false);

    const [data, setData] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            const api = new AuthAPI();
            const response = await api.login(data.username, data.password);
            setToken(response.token);
            setLoggedIn(response.success);
            setUserFromToken(response.token);
        } catch(error: AxiosError | any) {
            setError(new ApplicationError(error.response.status, error.response.statusText));
            setIsError(true);
        }       
    };

    useEffect(() => {
        if (isLoggedIn && token) {
            navigate('/');
        }
    }, [isLoggedIn, token, navigate]);

    const handleCreateAccountClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setShowCreateAccount(true);
    };

    useEffect(() => {
        console.log(showCreateAccount);
    }, [showCreateAccount]); 

    return (
        <>
            <section className="flex items-center justify-center min-h-screen overflow-hidden relative" style={{
                backgroundImage: 'url("/1920x1080.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className="container-fluid mx-auto max-w-md relative z-10 flex items-center">
                    <div className="flex items-center justify-center h-full">
                        <div className="w-full max-w-md">
                            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800 p-12">
                                <div className="lg:w-full">
                                    <div className="mx-6">
                                        {!showCreateAccount ? (
                                            <LoginForm setShowCreateAccount={setShowCreateAccount} />
                                        ) : (
                                            <CreateAccount setShowCreateAccount={setShowCreateAccount} />
                                        )}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute left-0 bottom-0 z-0">
                    <img
                        src="/geometry-border.png"
                        alt="Corner Image"
                        className="w-80 h-auto"
                    />
                </div>
            </section>
        </>
    );
}
