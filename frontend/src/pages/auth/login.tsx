import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth.hooks';
import CreateAccount from "./signup";
import ForgotPassword from "./forgot_password";
import { LoginForm } from "./login_form";

export function LoginPage() {
    const navigate = useNavigate();
    const { isLoggedIn, token } = useAuth(); 
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    useEffect(() => {
        if (isLoggedIn && token) {
            navigate('/');
        }
    }, [isLoggedIn, token, navigate]);


    useEffect(() => {
        console.log(showCreateAccount);
    }, [showCreateAccount]); 

    return (
        <>
            <section
                className="flex items-center justify-center min-h-screen overflow-hidden relative"
                style={{
                    backgroundImage: 'url("/1920x1080.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="container-fluid mx-auto max-w-md relative z-10 flex items-center">
                    <div className="flex items-center justify-center h-full">
                        <div className="w-full max-w-md">
                            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800 p-12">
                                <div className="lg:w-full">
                                    <div className="mx-6">
                                        {!showCreateAccount && !showForgotPassword ? (
                                            <LoginForm
                                                setShowCreateAccount={setShowCreateAccount}
                                                setShowForgotPassword={setShowForgotPassword}
                                            />
                                        ) : showCreateAccount ? (
                                            <CreateAccount setShowCreateAccount={setShowCreateAccount} />
                                        ) : (
                                            <ForgotPassword setShowForgotPassword={setShowForgotPassword} />
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
