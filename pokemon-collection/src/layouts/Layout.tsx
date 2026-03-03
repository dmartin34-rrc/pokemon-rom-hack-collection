import { Outlet } from "react-router-dom";

// components
import Header from "./header/Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SharedMessageBarContainer from "../components/sharedPageState/SharedMessageBarContainer";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Navbar />
      <SharedMessageBarContainer />

      <main className="flex-1 p-5">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;