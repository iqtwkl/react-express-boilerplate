'use client';

import { Footer } from 'flowbite-react';

const FooterComponent = () => {
  return (
    <Footer container className='mt-10 bottom-0'>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="/"
            src="/masagi-shortlogo-color.png"
            alt="Masif Log"
            name="MASIFLog"
          />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="Iqbal Tawakal" year={new Date().getFullYear()} />
      </div>a
    </Footer>
  );
}

export default FooterComponent;
