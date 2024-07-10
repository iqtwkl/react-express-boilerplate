import React, { useState } from "react";

const DashboardCards = () => {
    const dashboardIds = ["A", "B", "C"];

    const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});
    
    const toggleDropdown = (id: string) => {
        setDropdownOpen(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {dashboardIds.map((id) => (
                    <div key={id} className="relative">
                        <div className="w-full max-w-xs bg-white border border-[#629093] rounded-[35px] shadow hover:shadow-lg">
                            <div className="relative flex justify-end px-4 pt-4">
                                <span
                                    onClick={() => toggleDropdown(id)}
                                    className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5 cursor-pointer"
                                >
                                    <span className="sr-only">Open dropdown</span>
                                    <img
                                        src="/setting.png"
                                        alt="Settings"
                                        className="w-5 h-5"
                                    />
                                </span>
                                {dropdownOpen[id] && (
                                    <div className="absolute right-0 top-full mt-1 w-44 bg-white divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-lg dark:bg-gray-700">
                                        <ul className="py-2">
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                                    Setting
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <a href={`/dashboard/${id}`} className="block">
                                <div className="flex flex-col items-center pb-10">
                                    <img className="w-40 h-40" src="/dashboard.png" alt={`Dashboard ${id} image`} />
                                </div>
                                <div className="flex flex-col px-8 pb-10">
                                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{`Dashboard ${id}`}</h5>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Description</span>
                                </div>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardCards;
