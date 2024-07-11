import React from 'react';
import { useParams } from 'react-router-dom';
import PageTitleComponent from '../../components/common/pageTitle';
import FooterComponent from '../../components/common/footer/footer';
import BreadcrumbComponent from '../../components/common/breadcrumb';

const DashboardComponent = () => {
    const { id } = useParams<{ id: string }>(); // Ensure id is correctly typed as string
    const title = 'Dashboard ' + id;

    const iframeSources: { [key: string]: string } = {
        A: 'http://103.49.239.45:5601/app/dashboards#/view/434ddc65-3d48-4a35-a8f0-4d312ceaad93?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-1y%2Fd%2Cto%3Anow))&show-query-input=true&show-time-filter=true',
        B: 'http://103.49.239.45:5601/app/dashboards#/view/edf84fe0-e1a0-11e7-b6d5-4dc382ef7f5b?embed=true&_g=()&_a=()&show-query-input=true&show-time-filter=true',
        C: 'http://103.49.239.45:5601/app/dashboards#/view/722b74f0-b882-11e8-a6d9-e546fe2bba5f?embed=true&_g=()&_a=()&show-query-input=true&show-time-filter=true',
    };

    const breadcrumbList = [
        { href: '/', name: 'Dashboards' },
        { href: '', name: 'Dashboard ' + id },
    ];

    const src = iframeSources[id as keyof typeof iframeSources];

    if (!src) {
        throw new Error(`Invalid dashboard id: ${id}`);
    }

    return (
        <div className="container mx-auto bg-[#629093] rounded-tl-[35px] rounded-tr-[35px] shadow-lg border border-gray-200">
            {/* Kibana Dashboard */}
            <div className='px-10 py-5'>
                <PageTitleComponent title={title} />
                <div>
                    <BreadcrumbComponent list={breadcrumbList} />
                </div>
                <div className='mt-2 p-3 rounded-[5px]' style={{ backgroundColor: 'white', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)' }}>
                    <iframe
                        src={src}
                        height="600"
                        width="100%"
                        style={{ border: 'none', outline: 'none', background: 'none' }}
                        frameBorder="0"
                    ></iframe>
                </div>
                <FooterComponent />
            </div>
        </div>
    );
};

export default DashboardComponent;
