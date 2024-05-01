
'use client';

import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiUser} from 'react-icons/hi';

const SidebarComponent = () => {
  return (
    <aside className='fixed top-0 left-0 ml-4 mt-4 mb-4 z-20 flex-col flex-shrink-0 hidden w-64 h-full font-normal duration-75 lg:flex transition-width'>
        <Sidebar aria-label="RKG" className='relative p-2 flex flex-col flex-1 min-h-0 pt-0 w-full mr-4 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm'>
            <Sidebar.Logo href="#" img="/vite.svg" imgAlt="Vite logo">
                Boilerplate
            </Sidebar.Logo>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="/" icon={HiChartPie}>
                        Dashboard
                    </Sidebar.Item>
                    <Sidebar.Collapse icon={HiUser} label="Accounts">
                        <Sidebar.Item href="/accounts/account">Accounts</Sidebar.Item>
                        <Sidebar.Item href="/accounts/role">Role</Sidebar.Item>
                    </Sidebar.Collapse>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    </aside>
  );
}

export default SidebarComponent;
