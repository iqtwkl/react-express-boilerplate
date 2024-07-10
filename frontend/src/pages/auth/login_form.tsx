import { useState, useEffect } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { AuthAPI } from '../../services/api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import ErrorModalComponent from "../../components/common/error";

interface LoginFormProps {
    setShowCreateAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LoginForm({ setShowCreateAccount }: LoginFormProps) {
    const navigate = useNavigate();
    const { isLoggedIn, setLoggedIn, token, setToken } = useAuth();
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');

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
        } catch (error: any) {
            setError(error.response.data.error);
            setIsError(true);
        }
    };

    useEffect(() => {
        if (isLoggedIn && token) {
            navigate('/');
        }
    }, [isLoggedIn, token, navigate]);

    const handleCreateAccountClick = () => {
        setShowCreateAccount(true);
    };

    return (
        <>
            <div className="flex items-center justify-center mb-6">
                <img className="w-20" src="/masagi-shortlogo-color.png" alt="logo" />
                <h6 className="text-xl font-semibold">
                    MASIFLog
                </h6>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="relative">
                    <TextInput
                        id="username"
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={data.username}
                        onChange={handleInputChange}
                        required
                        className="text-sm"
                        style={{
                            border: '1px solid #629093',
                            backgroundImage: 'url("/user-primary.png")',
                            backgroundSize: '16px 16px',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: '8px center',
                            paddingLeft: '32px',
                            backgroundColor: 'transparent',
                        }}
                    />
                </div>
                <div className="relative">
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={handleInputChange}
                        required
                        style={{
                            border: '1px solid #629093',
                            backgroundImage: 'url("/key-primary.png")',
                            backgroundSize: '16px 16px',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: '8px center',
                            paddingLeft: '32px',
                            backgroundColor: 'transparent',
                        }}
                    />
                </div>
                <div className="flex items-center justify-end">
                    <Label
                        htmlFor="forgotpwd"
                        className="text-xs cursor-pointer underline"
                        style={{ textDecorationColor: '#629093', color: '#629093', }}
                    >
                        Forgot Password?
                    </Label>
                </div>
                <div className="flex items-center justify-center">
                    <Button
                        type="submit"
                        size="sm"
                        className="btn btn-sm"
                        style={{
                            width: '100px',
                            backgroundColor: '#629093',
                            color: '#fff',
                            border: '1px solid #629093',
                            borderRadius: '20px',
                            marginTop: '40px'
                        }}
                    >
                        Log In
                    </Button>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="text-xs cursor-pointer"
                        style={{ textDecorationColor: '#629093', color: '#629093', }}
                        onClick={handleCreateAccountClick}
                    >
                        Create Account
                    </button>
                </div>
            </form>
            <ErrorModalComponent error={error} isError={isError} setIsError={setIsError} />
        </>
    );
}
