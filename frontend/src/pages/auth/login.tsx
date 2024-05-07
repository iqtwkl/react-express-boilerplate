import { useState, useEffect } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import FooterComponent from '../../components/common/footer/footer';
import { AuthAPI } from '../../services/api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

export function LoginPage() {
    const navigate = useNavigate();
    const { isLoggedIn, setLoggedIn, token, setToken } = useAuth(); 
    const [data, setData] = useState({
        username: '',
        password: ''
    });

    // Penangan perubahan nilai pada input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value
        });
    };

    // Penangan saat formulir login disubmit
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const api = new AuthAPI();
        const response = await api.login(data.username, data.password);
        if (response.success && response.token) {
            setToken(response.token);
            setLoggedIn(response.success);
        } else {
            throw Error(response.error);
        }
    };

    useEffect(() => {
        if (isLoggedIn && token) {
            navigate('/');
        }
    }, [isLoggedIn, token, navigate]);

    return (
        <>
            <section className="grid gradient-form bg-neutral-200 dark:bg-neutral-700 place-content-center">
                <div className="container h-full p-10">
                    <div
                    className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <div className="w-full">
                        <div
                        className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                        <div className="g-0 lg:flex lg:flex-wrap">
                            <div className="px-4 md:px-0 lg:w-6/12">
                            <div className="md:mx-6 md:p-12">
                                <div className="text-center">
                                <img
                                    className="mx-auto w-48"
                                    src="/vite.svg"
                                    alt="logo" />
                                <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                    Boilerplate
                                </h4>
                                </div>

                                <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="email1" value="Your email" />
                                        </div>
                                        <TextInput 
                                            id="username" 
                                            type="username" 
                                            placeholder="username" 
                                            name="username"
                                            value={data.username}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="password" value="Your password" />
                                        </div>
                                        <TextInput 
                                            id="password" 
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            onChange={handleInputChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="remember" />
                                        <Label htmlFor="remember">Remember me</Label>
                                    </div>
                                    <Button type="submit">Submit</Button>
                                    <div className="flex items-center justify-between pb-6">
                                        <p className="mb-0 me-2">Don't have an account?</p>
                                        <button
                                            type="button"
                                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
                                            data-twe-ripple-init
                                            data-twe-ripple-color="light">
                                            Register
                                        </button>
                                    </div>
                                </form>
                            </div>
                            </div>

                            <div className="grid-flex content-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none bg-black">
                                <div className="flex px-2 py-4 text-white md:mx-6 md:p-2">
                                    <svg className="w-12 h-8 p-1 text-gray-50 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"></path>
                                    </svg>
                                    <div>
                                        <h3 className="mb-6 text-xl font-semibold">
                                        Lorem ipsum dolor sit amet
                                        </h3>
                                        <p className="text-sm">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing
                                        elit, sed do eiusmod tempor incididunt ut labore et
                                        dolore magna aliqua.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex px-2 py-4 text-white md:mx-6 md:p-2">
                                    <svg className="w-12 h-8 p-1 text-gray-50 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"></path>
                                    </svg>
                                    <div>
                                        <h3 className="mb-6 text-xl font-semibold">
                                        Lorem ipsum dolor sit amet
                                        </h3>
                                        <p className="text-sm">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing
                                        elit, sed do eiusmod tempor incididunt ut labore et
                                        dolore magna aliqua.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex px-2 py-4 text-white md:mx-6 md:p-2">
                                    <svg className="w-12 h-8 p-1 text-gray-50 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"></path>
                                    </svg>
                                    <div>
                                        <h3 className="mb-6 text-xl font-semibold">
                                        Lorem ipsum dolor sit amet
                                        </h3>
                                        <p className="text-sm">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing
                                        elit, sed do eiusmod tempor incididunt ut labore et
                                        dolore magna aliqua.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
            <FooterComponent />
        </>
    );
}