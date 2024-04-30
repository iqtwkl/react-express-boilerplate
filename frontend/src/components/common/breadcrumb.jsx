
'use client';

import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';

const BreadcrumbComponent = ({list = []}) => {

    const setItem = () => {
        if (list.length > 0) {
            return list.map((element, index) => (
                <Breadcrumb.Item key={index} href={element.href}>
                    {element.name}
                </Breadcrumb.Item>
            ));
        }
    }
    
    return (
    <Breadcrumb aria-label="breadcrumb" className="mt-4" >
        <Breadcrumb.Item href="#" icon={HiHome}>
        Home
        </Breadcrumb.Item>
        { setItem() }
    </Breadcrumb>
    );
}

export default BreadcrumbComponent
