import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/footer";

export function Layout() {
    return(
        <>
            <Header />
            {/* <Nav /> */}
            <main>
                <Outlet />  
            </main>
            <Footer />
        </>
    )
}