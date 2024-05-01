// import '../App.css';
import RootLayout from '../components/layouts/layout';

export function IndexPage() {
  const breadcrumbList = [
    { href: '', name: 'Dashboard' },
  ];

  return (
    <RootLayout breadcrumbList={breadcrumbList} title='Dashboard'>
        <h1>Dashboard</h1>
        <div>
            <p>chart</p>
        </div>
    </RootLayout>
  ) 
  }