import { useState } from 'react';
import RootLayout from '../../components/layouts/layout';
import { ApplicationError } from '../../components/common/error';
import { KibanaSettings } from '../../components/common/table/table-connection/kibana';
import { ElasticSettings } from '../../components/common/table/table-connection/elastic';
import { LogstashSettings } from '../../components/common/table/table-connection/logstash';

export function ConnectionPage() {
    const [isError, setIsError] = useState(false);
    const [error] = useState<ApplicationError>(Object);

    const breadcrumbList = [
        { href: '', name: 'Connection' },
    ];
    
    const [selectedButton, setSelectedButton] = useState('elasticPanel');

    const handleButtonClick = (button: string) => {
        setSelectedButton(button);
    }

    return (
        <>
            <RootLayout breadcrumbList={breadcrumbList} title='Connection' error={error} isError={isError} setIsError={setIsError}>
                <div>
                    <div className="flex justify-between w-full mx-auto object-center px-5 py-3 bg-[#D0DEDF] text-[#629093] border border-[#629093] rounded-full">
                        <div className={selectedButton === 'elasticPanel' ? 'bg-[#629093] rounded-2xl text-white px-5 py-1 shadow-sm' : 'px-5 py-1'}>
                            <button onClick={() => handleButtonClick('elasticPanel')}>Elastic Settings</button>
                        </div>
                        <div className={selectedButton === 'logstashPanel' ? 'bg-[#629093] rounded-2xl text-white px-5 py-1 shadow-sm' : 'px-5 py-1'}>
                            <button onClick={() => handleButtonClick('logstashPanel')}>Logstash Settings</button>
                        </div>  
                        <div className={selectedButton === 'kibanaPanel' ? 'bg-[#629093] rounded-2xl text-white px-5 py-1 shadow-sm' : 'px-5 py-1'}>
                            <button onClick={() => handleButtonClick('kibanaPanel')}>Kibana Settings</button>
                        </div>
                    </div>
                    <div>
                        {selectedButton === 'elasticPanel' && (
                            <ElasticSettings />
                        )}
                        {selectedButton === 'logstashPanel' && (
                            <LogstashSettings />
                        )}
                        {selectedButton === 'kibanaPanel' && (
                            <KibanaSettings />
                        )}
                    </div>
                </div>
            </RootLayout>
        </>
    )
}
