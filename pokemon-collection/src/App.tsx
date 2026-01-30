import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import { CardList } from "./components/card";
import PageOne from "./pages/PageOne";
import PageTwo from "./pages/PageTwo";

function App(): JSX.Element {
  const [sharedCount, setSharedCount] = useState<number>(0);

  return (
    <>
      <Header />

      <main>
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                <PageOne
                  sharedCount={sharedCount}
                  setSharedCount={setSharedCount}
                />
                <CardList />
              </>
            }
          />

          {/* Page Two */}
          <Route
            path="/page-two"
            element={
              <PageTwo
                sharedCount={sharedCount}
                setSharedCount={setSharedCount}
              />
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
