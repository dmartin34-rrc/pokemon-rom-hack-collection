import "./App.css";

import { CardList } from "./components/card.tsx";
import Header from "./components/common/header/Header.tsx";
import Footer from "./components/common/footer/Footer.tsx";

function App() {
  return (
    <>
      <Header />
      
      <main>
        <CardList />
      </main>

      <Footer />
    </>
  );
}

export default App;
