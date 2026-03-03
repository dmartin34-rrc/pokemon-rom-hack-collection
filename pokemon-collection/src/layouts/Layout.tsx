import { Outlet } from "react-router-dom";

import Header from "./header/Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SharedMessageBarContainer from "../components/sharedPageState/SharedMessageBarContainer";

const Layout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <SharedMessageBarContainer />
    </>
  );
};

export default Layout;