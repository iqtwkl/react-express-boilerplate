
'use client';

import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiUser, HiCog} from 'react-icons/hi';

const SidebarComponent = () => {
  const theme = {
    "root": {
        "inner": "h-full overflow-y-auto overflow-x-hidden rounded bg-[#629093] px-3 py-4 dark:bg-gray-800",
    },
    "item": {
        "base": "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-50 hover:bg-[#99B7B9] dark:text-white dark:hover:bg-gray-700",
        "icon": {
            "base": "h-6 w-6 flex-shrink-0 text-gray-100 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
            "active": "text-gray-100 dark:text-gray-100"
        },
    },
    "collapse": {
        "button": "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-50 transition duration-75 hover:bg-[#99B7B9] dark:text-white dark:hover:bg-gray-700",
        "icon":{
            "base": "h-6 w-6 text-gray-50 transition duration-75 group-hover:text-gray-100 dark:text-gray-400 dark:group-hover:text-white",
            "open": {
              "off": "",
              "on": "text-gray-100"
            }
        }
    }
  }
  return (
    <aside className='fixed top-20 left-0 ml-4 mt-4 mb-4 z-20 flex-col flex-shrink-0 hidden w-64 h-full font-normal duration-75 lg:flex transition-width'>
        <Sidebar theme={theme} aria-label="Masif Log" className='relative p-2 flex flex-col flex-1 min-h-0 pt-0 w-full mr-4 bg-[#629093] border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm'>
            <div className='pb-6'>
                <p className='self-center whitespace-nowrap text-sm font-normal text-gray-50 dark:text-white'>Welcome back, </p>
                <p className='self-center whitespace-nowrap font-[Coda,sans-serif] text-lg font-bold text-gray-50 dark:text-white'>Genta Alima Persada</p>
            </div> 
            <hr className='pb-2 pt-2'/>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="/" icon={HiChartPie}>
                        Dashboard
                    </Sidebar.Item>
                    <Sidebar.Collapse icon={HiUser} label="Accounts">
                        <Sidebar.Item href="/account">Accounts</Sidebar.Item>
                        <Sidebar.Item href="/role">Role</Sidebar.Item>
                    </Sidebar.Collapse>
                    <Sidebar.Item href="/connection" icon={HiCog}>
                        Connection
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    </aside>
  );
}

export default SidebarComponent;

