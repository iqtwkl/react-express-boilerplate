import RootLayout from '../../components/layouts/layout';

export function RoleIndexPage() {
    const breadcrumbList = [
        { href: '', name: 'Role' },
    ];

    return (
        <>
            <RootLayout breadcrumbList={breadcrumbList} title='Role'>
                <h1>Role</h1>
                <div>
                    <p>list role</p>
                </div>
            </RootLayout>
        </>
    )
}