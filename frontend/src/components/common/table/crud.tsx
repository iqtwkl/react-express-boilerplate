import { TextInput } from "flowbite-react";
import TableComponent, { ITableProps } from ".";
import { FaPlus, FaSearch } from 'react-icons/fa';

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
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                        <form className="flex items-center">
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <FaSearch />
                                </div>
                                <TextInput type="text" id="simple-search" className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" />
                            </div>
                        </form>
                    </div>
                    <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <button onClick={() => setIsCreate(true) } type="button" className="flex items-center justify-center text-black bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium border rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 dark:text-white">
                            <FaPlus className="mr-1" /> Add item
                        </button>
                    </div>
                </div>
                <TableComponent columnConfig={columnConfig} data={data} />        
            </div>
        </>
    )
}


export default CrudTableComponent;