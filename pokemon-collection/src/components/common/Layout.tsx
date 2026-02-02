// components
import { CardList } from '../card';
import Footer from './footer/footer';
import Header from './header/Header';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <CardList />
      <Footer />
    </>
  );
};

export default Layout;
