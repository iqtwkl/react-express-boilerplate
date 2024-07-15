

const DashboardCards = () => {
    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                    <div className="px-6 py-4">
                        <img className="w-full max-h-[150px]" src="https://via.placeholder.com/150" alt="Forest" />
                    </div>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Dashboard A</div>
                        <p className="text-gray-700 text-base">
                            Description A.
                        </p>
                    </div>
                </div>

                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                    <div className="px-6 py-4">
                        <img className="w-full max-h-[150px]" src="https://via.placeholder.com/150" alt="Forest" />
                    </div>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Dashboard B</div>
                        <p className="text-gray-700 text-base">
                            Description B.
                        </p>
                    </div>
                </div>

                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                    <div className="px-6 py-4">
                        <img className="w-full max-h-[150px]" src="https://via.placeholder.com/150" alt="Forest" />
                    </div>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Dashboard C</div>
                        <p className="text-gray-700 text-base">
                            Description C.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCards;
