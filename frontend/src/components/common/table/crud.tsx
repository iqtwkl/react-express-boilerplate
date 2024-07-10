import { TextInput } from "flowbite-react";
import TableComponent, { ITableProps } from ".";
import { FaPlusCircle, FaSearch } from 'react-icons/fa';

interface CrudTableProps extends ITableProps {
    setIsCreate: (isCreate: boolean) => void;
}

const CrudTableComponent = (props: CrudTableProps) => {
    const {
        columnConfig,
        data,
        setIsCreate,
    } = props;

    return (
        <> 
            <div className="dark:bg-gray-800 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-4">
                    <div className="w-full md:w-1/2">
                        <form className="flex items-center">
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <FaSearch />
                                </div>
                                <TextInput 
                                    type="text" id="simple-search" 
                                    className="border-gray-300 text-gray-900 text-sm block w-1/2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                    placeholder="Search"
                                    style={{
                                        borderRadius: '20px', 
                                        backgroundColor: '#D0DEDF',
                                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)' // Adjust this to get the desired inner shadow effect
                                    }} 
                                />
                            </div>
                        </form>
                    </div>
                    <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <button 
                            onClick={() => setIsCreate(true) } 
                            type="button" 
                            className="flex items-center justify-center text-white focus:ring-4 focus:ring-primary-300 font-medium shadow hover:shadow-sm text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 dark:text-white"
                            style={{
                                borderRadius: '20px', 
                                backgroundColor: '#99B7B9',
                            }}
                        >
                            <FaPlusCircle className="mr-1" /> Create New
                        </button>
                    </div>
                </div>
                <TableComponent columnConfig={columnConfig} data={data} />        
            </div>
        </>
    )
}


export default CrudTableComponent;