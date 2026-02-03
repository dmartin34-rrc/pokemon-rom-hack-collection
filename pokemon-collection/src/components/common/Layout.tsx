import { Outlet } from 'react-router-dom';
// components
import Header from './header/Header';
import Navbar from './Navbar';
import Footer from './footer/footer';

const Layout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
