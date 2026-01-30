import { Outlet } from 'react-router-dom';
// components
import Footer from './footer/footer';
import Header from './header/Header';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <>
      <Header />
      <Navbar />
      {/* uncomment Outlet component when ready to use */}
      {/* <Outlet/> */}
      <Footer />
    </>
  );
};

export default Layout;
