import { Footer } from 'flowbite-react';

const FooterComponent = () => {
  return (
    <Footer container className='mt-10 bottom-0 border-none shadow-none' style={{ background: 'none' }}>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          {/* <Footer.Brand
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
          </Footer.LinkGroup> */}
        </div>
        <Footer.Divider style={{ color: '#D0DEDF' }} />
        <Footer.Copyright 
          href="#" 
          by="MASIFLog™" 
          year={2024} 
          style={{ color: '#D0DEDF' , fontWeight: 'bold'}} 
        />
      </div>
    </Footer>
  );
}

export default FooterComponent;
