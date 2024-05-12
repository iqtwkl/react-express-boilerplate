import { ThemeModeScript, Flowbite, Footer } from 'flowbite-react';
import SidebarComponent from '../common/sidebar/sidebar'
import NavbarComponent from '../common/navbar/navbar';
import FooterComponent from '../common/footer/footer';
import BreadcrumbComponent from '../common/breadcrumb';
import PageTitleComponent from '../common/pageTitle';
import { useAuth } from '../../hooks/AuthContext';
import { Navigate } from 'react-router-dom';
import ErrorModalComponent from '../common/error';

export default function RootLayout({children, breadcrumbList, title, error, isError, setIsError }) {
    const { isLoggedIn, token } = useAuth();

    if (!isLoggedIn && !token) {
        return <Navigate to="/auth/login" />;
    }

    return (
        <Flowbite>
            <ThemeModeScript />
            <div className='flex overflow-hidden bg-gray-50 dark:bg-gray-900'>
                <SidebarComponent />
                <div id="main-content" className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-72 dark:bg-gray-900">
                    <main className='min-h-screen'>
                        <div className='px-4 pt-4'>
                            <NavbarComponent />
                            <BreadcrumbComponent list={breadcrumbList} />
                            <PageTitleComponent title={title} />
                            <div className='min-h-fit mt-4'>
                                <div className='p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-4 dark:bg-gray-800'>
                                    {children}
                                </div>
                            </div>
                            <FooterComponent />
                        </div>
                    </main>
                </div>
            </div>
            <ErrorModalComponent error={error} isError={isError} setIsError={setIsError} />
        </Flowbite>
    );
}