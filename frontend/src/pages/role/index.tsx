import { useState } from 'react';
import RootLayout from '../../components/layouts/layout';
import { ApplicationError } from '../../components/common/error';

export function RoleIndexPage() {
    const [isError, setIsError] = useState(false);
    const [error] = useState<ApplicationError>(Object);
    const breadcrumbList = [
        { href: '', name: 'Role' },
    ];

    return (
        <>
            <RootLayout breadcrumbList={breadcrumbList} title='Role' error={error} isError={isError} setIsError={setIsError}>
                <h1>Role</h1>
                <div>
                    <p>list role</p>
                </div>
            </RootLayout>
        </>
    )
}