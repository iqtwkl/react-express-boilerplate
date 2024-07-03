import { ThemeModeScript, Flowbite, Footer } from 'flowbite-react';
import SidebarComponent from '../common/sidebar/sidebar'
import NavbarComponent from '../common/navbar/navbar';
import FooterComponent from '../common/footer/footer';
import BreadcrumbComponent from '../common/breadcrumb';
import PageTitleComponent from '../common/pageTitle';
import { useAuth } from '../../hooks/AuthContext';
import { Navigate } from 'react-router-dom';
import ErrorModalComponent, { ApplicationError } from '../common/error';
import DashboardCards from '../../pages/dashboard';

const RootLayout = (
    {children, 
    breadcrumbList, 
    title, 
    error, 
    isError, 
    setIsError}
) => {
    const { isLoggedIn, token } = useAuth();

    if (!isLoggedIn && !token) {
        return <Navigate to="/auth/login" />;
    }

    return (
        <Flowbite>
            <ThemeModeScript />
            <NavbarComponent />
            <div className='flex overflow-hidden pt-20'>
                <SidebarComponent />
                <div id="main-content" className="relative w-full h-full overflow-y-auto mt-8 lg:ml-72">
                    <main className='min-h-screen'>
                        <div className='px-4 pt-4'>
                            {title !== 'Dashboard' ? (
                                <>
                                    <BreadcrumbComponent list={breadcrumbList} />
                                    <PageTitleComponent title={title} />
                                    <div className='min-h-fit mt-4'>
                                        <div className='p-4 bg-[#629093] text-gray-50 border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-4 dark:bg-gray-800'>
                                            {children}
                                        </div>
                                    </div>
                                    <FooterComponent />
                                </>
                            ) : (
                                <div className='min-h-fit mt-4'>
                                    <DashboardCards/>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
            <ErrorModalComponent error={error} isError={isError} setIsError={setIsError} />
        </Flowbite>
    );
}

export default RootLayout;
