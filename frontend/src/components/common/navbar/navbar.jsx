
'use client';

import { Avatar, Dropdown, Navbar, DarkThemeToggle, TextInput, Label } from 'flowbite-react';
import { useAuth } from '../../../hooks/AuthContext';

const NavbarComponent = () => {
  const { logout, loggedUser } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar className='fixed z-30 w-full justify-between' fluid>
      <Navbar.Brand>
        <img src="/masagi-shortlogo-color.png" className="mr-3 h-6 sm:h-9" alt="Logo" /> 
        <h3 className='self-center whitespace-nowrap text-2xl font-semibold text-gray-800 dark:text-white'> MASIFLog</h3>
      </Navbar.Brand>
      <form action="#" method="GET" className="hidden lg:block lg:pl-3.5">
        <Label htmlFor="topbar-search" className="sr-only" value='Search' />
        <div className="relative mt-1 lg:w-96">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
          </div>
          <TextInput 
              id="topbar-search" 
              className="text-gray-900 sm:text-sm block w-full pl-10 p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
              placeholder="Search" 
              style={{
                  borderRadius: '20px', 
                  backgroundColor: '#D0DEDF',
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)' // Adjust this to get the desired inner shadow effect
              }} 
          />
        </div>
      </form>
      <div className="flex md:order-2">
        <DarkThemeToggle className='mr-4'/>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{loggedUser.fullName ? loggedUser.fullName : loggedUser.username }</span>
            <span className="block truncate text-sm font-medium">{loggedUser.email}</span>
          </Dropdown.Header>
          <Dropdown.Item href='/'>Dashboard</Dropdown.Item>
          <Dropdown.Item href='/account/profile'>Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );
}

export default NavbarComponent;
