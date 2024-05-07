import RootLayout from '../../components/layouts/layout';

export function AccountIndexPage() {
    const breadcrumbList = [
        { href: '', name: 'Account' },
    ];

    return (
        <>
            <RootLayout breadcrumbList={breadcrumbList} title='Account'>
                <h1>Account</h1>
                <div>
                    <p>list account</p>
                </div>
            </RootLayout>
        </>
    )
}