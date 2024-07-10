import { Breadcrumb } from 'flowbite-react';

const BreadcrumbComponent = ({ list = [] }) => {
    const setItem = () => {
        if (list.length > 0) {
            return list.map((element, index) => (
                <Breadcrumb.Item
                    key={index}
                    href={element.href}
                    className={
                        index === list.length - 1
                            ? 'text-gray-400 pointer-events-none'
                            : 'text-[#0061A6] hover:text-[#004E8C] cursor-pointer'
                    }
                >
                    {element.name}
                </Breadcrumb.Item>
            ));
        }
    };

    return (
        <div className="bg-[#D0DEDF] bg-opacity-50 rounded-[5px]">
            <Breadcrumb aria-label="breadcrumb" className="mt-4 px-4 mb-4 py-1">
                <Breadcrumb.Item href="/" className="text-[#0061A6] hover:text-[#004E8C] cursor-pointer">
                    Home
                </Breadcrumb.Item>
                {setItem()}
            </Breadcrumb>
        </div>
    );
};

export default BreadcrumbComponent;
