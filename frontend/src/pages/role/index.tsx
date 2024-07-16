import { useState } from 'react';
import { ApplicationError } from '../../components/common/error';
import RootLayout from '../../components/layouts/layout';

export function RoleIndexPage() {
    const breadcrumbList = [
        { href: '', name: 'Role' },
    ];
    const [isError, setIsError] = useState(false);
    const [error] = useState<ApplicationError | null>(null);

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