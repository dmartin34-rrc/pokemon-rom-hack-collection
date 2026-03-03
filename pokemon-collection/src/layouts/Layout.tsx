import { Outlet } from "react-router-dom";

// components
import Header from "./header/Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SharedMessageBarContainer from "../components/sharedPageState/SharedMessageBarContainer";

const Layout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <main className="p-5">
        <Outlet />
      </main>
      <Footer />
      <SharedMessageBarContainer />
    </>
  );
};

export default Layout;