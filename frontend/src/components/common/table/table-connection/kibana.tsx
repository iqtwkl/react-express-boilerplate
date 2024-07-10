import { useState } from 'react';

export function KibanaSettings() {
    const allConnections = [
        { "id": 1, "name": "Ibun", "ip": "192.168.1.1", "author": "Viewer" },
        { "id": 2, "name": "Alden", "ip": "192.168.1.1", "author": "Editor" },
        { "id": 3, "name": "Timoty", "ip": "192.168.1.1", "author": "Admin" },
        { "id": 4, "name": "Salsa", "ip": "192.168.1.1", "author": "Viewer" },
        { "id": 5, "name": "Heydar", "ip": "192.168.1.1", "author": "Contributor" },
        { "id": 6, "name": "Rafi", "ip": "192.168.1.2", "author": "Viewer" },
        { "id": 7, "name": "Raihan", "ip": "192.168.1.2", "author": "Editor" },
        { "id": 8, "name": "Elvani", "ip": "192.168.1.3", "author": "Admin" },
        { "id": 9, "name": "Budi", "ip": "192.168.1.3", "author": "Viewer" },
        { "id": 10, "name": "Kokom", "ip": "192.168.1.3", "author": "Contributor" }
    ];

    const [records, setRecords] = useState(allConnections.slice(0, 5));
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    function handleFilter(event:React.ChangeEvent<HTMLInputElement>) {
        const newTerm = event.target.value.toLowerCase();
        setSearchTerm(newTerm);
        const filteredData = allConnections.filter(connection => {
            return connection.name.toLowerCase().includes(newTerm);
        });
        setRecords(filteredData.slice(0, recordsPerPage));
        setCurrentPage(1);
    }

    function changePage(pageNumber:number) {
        const filteredData = allConnections.filter(connection => {
            return connection.name.toLowerCase().includes(searchTerm);
        });
        const startIndex = (pageNumber - 1) * recordsPerPage;
        const newRecords = filteredData.slice(startIndex, startIndex + recordsPerPage);
        setRecords(newRecords);
        setCurrentPage(pageNumber);
    }

    const totalPages = Math.ceil(allConnections.filter(connection => {
        return connection.name.toLowerCase().includes(searchTerm);
    }).length / recordsPerPage);

    return (
        <>
            <div className="flex justify-between px-5 py-3 mt-1">
                <div className="relative w-full max-w-xs">
                    <input 
                        type="text" 
                        className="w-full p-2 pr-10 bg-[#D0DEDF] text-[#629093] border border-[#629093] rounded-full focus:outline-none focus:ring-2 focus:ring-[#629093]"
                        onChange={handleFilter}
                    />
                    <button className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#629093]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.39 4.39a1 1 0 01-1.415 1.415l-4.39-4.39zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className="flex justify-between text-base text-white bg-[#99B7B9] py-2 px-5 rounded-full shadow-sm">
                    <div className="items-center mr-2">
                        <img src="../public/plus icon.svg" alt="" className="w-5 h-auto py-1" />
                    </div>
                    <button className="">Create New</button>
                </div>
            </div>
            <div className="bg-[#D0DEDF] mx-3 mt-2 h-96 rounded-3xl">
                <br />
                <div className="mx-5 mb-10 min-w-screen rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full leading-normal mb-5">
                            <thead className="bg-[#629093] border-b-4 text-white sticky top-0">
                                <tr>
                                    <th className="py-2 px-4 border-b tracking-wide">No</th>
                                    <th className="py-2 px-4 border-b tracking-wide">Name</th>
                                    <th className="py-2 px-4 border-b tracking-wide">IP Address</th>
                                    <th className="py-2 px-4 border-b tracking-wide">Author</th>
                                    <th className="py-2 px-4 border-b tracking-wide">Edit</th>
                                </tr>
                            </thead>
                            <tbody className="bg-[#99B7B9] text-white text-center">
                                {records.map((connection, index) => (
                                    <tr key={index}>
                                        <td className="p-2 px-4 border-b text-center">{connection.id}</td>
                                        <td className="p-2 px-4 border-b">{connection.name}</td>
                                        <td className="p-2 px-4 border-b">{connection.ip}</td>
                                        <td className="p-2 px-4 border-b">{connection.author}</td>
                                        <td className="p-2 px-4 border-b text-center">
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                            <button data-id={connection.id} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={`px-3 py-1 mx-1 rounded ${currentPage === i + 1 ? 'bg-[#629093] text-white' : 'bg-white text-[#629093]'}`}
                        onClick={() => changePage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </>
    );
}