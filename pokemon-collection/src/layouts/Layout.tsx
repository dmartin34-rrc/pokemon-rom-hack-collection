import { Outlet } from 'react-router-dom';
// components
import Header from './header/Header';
import Navbar from './Navbar';
import Footer from './Footer';
import SharedMessageBar from '../components/sharedPageState/SharedMessageBar';

const Layout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
      <SharedMessageBar />
    </>
  );
};

export default Layout;
