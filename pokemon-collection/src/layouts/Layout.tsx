import { Outlet } from 'react-router-dom';
// components
import Header from './header/Header';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <main className="p-5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
