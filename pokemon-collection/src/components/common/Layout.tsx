// components
import Header from './header/Header';
import Navbar from './Navbar';
import Footer from './footer/footer';
import CardList from '../card/CardList';

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
