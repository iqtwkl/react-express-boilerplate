import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";

interface CreateAccountProps {
    setShowCreateAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateAccount = ({ setShowCreateAccount }: CreateAccountProps) => {
    const [data, setData] = useState({
        username: '',
        password: '',
        password_confirmation: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        setShowCreateAccount(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
            <h6 className="text-sm text-center mb-4 font-semibold" style={{ textDecorationColor: '#629093', color:'#629093' }}>
                Create Account
            </h6>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <div className="relative">
                    <label htmlFor="full_name" className="text-xs" style={{ textDecorationColor: '#629093', color:'#629093' }}>Full Name</label>
                    <TextInput 
                        id="full_name" 
                        type="text"
                        name="full_name"
                        onChange={handleInputChange}
                        required 
                        className="text-sm"
                        style={{
                            border: '1px solid #629093',
                            backgroundColor: 'transparent',
                            height: '30px',
                            width: '100%'
                        }}
                    />
                </div>
                <div className="relative">
                    <label htmlFor="email" className="text-xs" style={{ textDecorationColor: '#629093', color:'#629093' }}>E-Mail</label>
                    <TextInput 
                        id="email" 
                        type="text"
                        name="email"
                        onChange={handleInputChange}
                        required 
                        className="text-sm"
                        style={{
                            border: '1px solid #629093',
                            backgroundColor: 'transparent',
                            height: '30px',
                            width: '100%'
                        }}
                    />
                </div>
                <div className="relative">
                    <label htmlFor="password" className="text-xs" style={{ textDecorationColor: '#629093', color:'#629093' }}>Password</label>
                    <div className="relative">
                        <TextInput 
                            id="password" 
                            type={showPassword ? "text" : "password"}
                            name="password"
                            onChange={handleInputChange} 
                            required 
                            style={{
                                border: '1px solid #629093',
                                backgroundColor: 'transparent',
                                height: '30px',
                                width: '100%'
                            }}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3.5">
                            <svg 
                                className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" 
                                aria-hidden="true" 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" />
                                ) : (
                                    <path d="M228,175a8,8,0,0,1-10.92-3l-19-33.2A123.23,123.23,0,0,1,162,155.46l5.87,35.22a8,8,0,0,1-6.58,9.21A8.4,8.4,0,0,1,160,200a8,8,0,0,1-7.88-6.69l-5.77-34.58a133.06,133.06,0,0,1-36.68,0l-5.77,34.58A8,8,0,0,1,96,200a8.4,8.4,0,0,1-1.32-.11,8,8,0,0,1-6.58-9.21L94,155.46a123.23,123.23,0,0,1-36.06-16.69L39,172A8,8,0,1,1,25.06,164l20-35a153.47,153.47,0,0,1-19.3-20A8,8,0,1,1,38.22,99c16.6,20.54,45.64,45,89.78,45s73.18-24.49,89.78-45A8,8,0,1,1,230.22,109a153.47,153.47,0,0,1-19.3,20l20,35A8,8,0,0,1,228,175Z"/>
                                )}
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <label htmlFor="password_confirmation" className="text-xs" style={{ textDecorationColor: '#629093', color:'#629093' }}>Confirm Password</label>
                    <div className="relative">
                        <TextInput 
                            id="password_confirmation" 
                            type={showConfirmPassword ? "text" : "password"}
                            name="password_confirmation"
                            onChange={handleInputChange} 
                            required 
                            style={{
                                border: '1px solid #629093',
                                backgroundColor: 'transparent',
                                height: '30px',
                                width: '100%'
                            }}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3.5">
                            <svg 
                                className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" 
                                aria-hidden="true" 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="currentColor" 
                                viewBox="0 0 20 20" 
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? (
                                    <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" />
                                ) : (
                                    <path d="M228,175a8,8,0,0,1-10.92-3l-19-33.2A123.23,123.23,0,0,1,162,155.46l5.87,35.22a8,8,0,0,1-6.58,9.21A8.4,8.4,0,0,1,160,200a8,8,0,0,1-7.88-6.69l-5.77-34.58a133.06,133.06,0,0,1-36.68,0l-5.77,34.58A8,8,0,0,1,96,200a8.4,8.4,0,0,1-1.32-.11,8,8,0,0,1-6.58-9.21L94,155.46a123.23,123.23,0,0,1-36.06-16.69L39,172A8,8,0,1,1,25.06,164l20-35a153.47,153.47,0,0,1-19.3-20A8,8,0,1,1,38.22,99c16.6,20.54,45.64,45,89.78,45s73.18-24.49,89.78-45A8,8,0,1,1,230.22,109a153.47,153.47,0,0,1-19.3,20l20,35A8,8,0,0,1,228,175Z" />
                                )}
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
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
                        Submit
                    </Button>
                </div>
                <div className="flex items-center justify-center">
                    <Label
                        className="text-xs cursor-pointer" 
                        style={{ textDecorationColor: '#629093', color:'#629093' }} 
                    >
                        Have an account?
                    </Label>
                    <button 
                        className="text-xs cursor-pointer" 
                        style={{ textDecorationColor: '#629093', color:'#629093', marginLeft: '4px', fontWeight: 'bold', textDecoration: 'underline' }}
                        onClick={handleLoginClick}
                    >
                        Log In
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreateAccount;
