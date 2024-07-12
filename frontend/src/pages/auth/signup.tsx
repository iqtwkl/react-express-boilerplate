import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

interface CreateAccountProps {
    setShowCreateAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TextInputWithIconProps {
    id: string;
    type: string;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    icon?: React.ReactNode; 
}

const TextInputWithIcon = ({ id, type, name, onChange, required, icon }: TextInputWithIconProps) => {
    return (
        <div className="relative">
            <TextInput
                id={id}
                type={type}
                name={name}
                onChange={onChange}
                required={required}
                style={{
                    border: '1px solid #629093',
                    backgroundColor: 'transparent',
                    height: '30px',
                    width: '100%',
                    paddingRight: icon ? '30px' : '10px'
                }}
            />
            {icon && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                    {icon}
                </div>
            )}
        </div>
    );
};

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
            <h6 className="text-sm text-center mb-4 font-semibold" style={{ textDecorationColor: '#629093', color: '#629093' }}>
                Create Account
            </h6>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <div className="relative">
                    <label htmlFor="full_name" className="text-xs" style={{ textDecorationColor: '#629093', color: '#629093' }}>Full Name</label>
                    <TextInputWithIcon
                        id="full_name"
                        type="text"
                        name="full_name"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="relative">
                    <label htmlFor="email" className="text-xs" style={{ textDecorationColor: '#629093', color: '#629093' }}>E-Mail</label>
                    <TextInputWithIcon
                        id="email"
                        type="text"
                        name="email"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="relative">
                    <label htmlFor="password" className="text-xs" style={{ textDecorationColor: '#629093', color: '#629093' }}>Password</label>
                    <TextInputWithIcon
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={handleInputChange}
                        required
                        icon={showPassword ? (
                            <HiOutlineEye onClick={togglePasswordVisibility} style={{ color: '#629093', strokeWidth: 1 }} />
                        ) : (
                            <HiOutlineEyeOff onClick={togglePasswordVisibility} style={{ color: '#629093', strokeWidth: 1 }} />
                        )}
                    />
                </div>
                <div className="relative">
                    <label htmlFor="password_confirmation" className="text-xs" style={{ textDecorationColor: '#629093', color: '#629093' }}>Confirm Password</label>
                    <TextInputWithIcon
                        id="password_confirmation"
                        type={showConfirmPassword ? "text" : "password"}
                        name="password_confirmation"
                        onChange={handleInputChange}
                        required
                        icon={showConfirmPassword ? (
                            <HiOutlineEye onClick={toggleConfirmPasswordVisibility} style={{ color: '#629093', strokeWidth: 1 }} />
                        ) : (
                            <HiOutlineEyeOff onClick={toggleConfirmPasswordVisibility} style={{ color: '#629093', strokeWidth: 1 }} />
                        )}
                    />
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
                        className="text-xs"
                        style={{ textDecorationColor: '#629093', color: '#629093' }}
                    >
                        Have an account?
                    </Label>
                    <button
                        className="text-xs cursor-pointer"
                        style={{ textDecorationColor: '#629093', color: '#629093', marginLeft: '4px', fontWeight: 'bold', textDecoration: 'underline' }}
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
