import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { HiMail} from 'react-icons/hi';

interface ForgotPasswordProps {
    setShowForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPassword = ({setShowForgotPassword}:ForgotPasswordProps) =>{
    const [data, setData] = useState({
        email: ''
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
        // Implement account creation logic here
    };

    const handleLoginClick = () => {
        setShowForgotPassword(false);
    };
    return(
        <>
            <div>
                <h6 className="text-sm text-center mb-8 font-semibold" style={{ textDecorationColor: '#629093', color:'#629093' }}>
                    Forgot Password ?
                </h6>
                <h6 className="text-sm mb-3" style={{ textDecorationColor: '#629093', color:'#629093' }}>
                    Please enter your e-mail address to reset the password.
                </h6>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <div className="relative mb-16">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            onChange={handleInputChange}
                            required
                            icon={HiMail}
                            className="text-sm"
                            style={{
                                border: '1px solid #629093',
                                paddingLeft: '36px',
                                backgroundColor: 'transparent',
                            }}
                        />
                    </div>
                    <div className="flex items-center mb-2 justify-center">
                        <Button 
                            type="submit" 
                            size="xs"
                            className="btn btn-xs"
                            style={{
                                width: '120px', 
                                backgroundColor: '#629093', 
                                color: '#fff', 
                                border: '1px solid #629093', 
                                borderRadius: '20px', 
                                marginTop: '20px'
                            }}
                        >
                            Send
                        </Button>
                    </div>
                </form>
                <div className="flex text-center items-center justify-center">
                    <button 
                        className="text-xs cursor-pointer" 
                        style={{ textDecorationColor: '#629093', color:'#629093', marginLeft: '4px', textDecoration: 'underline' }}
                        onClick={handleLoginClick}
                    >
                        Back to Log In
                    </button>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;