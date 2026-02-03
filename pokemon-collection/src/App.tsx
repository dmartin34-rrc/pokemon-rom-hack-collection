import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// components
import Layout from "./components/common/Layout.tsx";
import CardList from "./components/card/CardList.tsx";
import RomDirectory from "./components/directory/RomDirectory.tsx";
import Favorites from "./components/pages/Favorites.tsx";
import ProgressTrackerPage from "./components/pages/ProgressTrackerPage.tsx";

// data
import cardData from "./data/cardData.json";

// types
import type Rom from "./types/Rom";

function App() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const updateFavorites = (title: string) => {
    setFavorites((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  // tracker
  const [trackedRoms, setTrackedRoms] = useState<Rom[]>([]);

  // shared message across all pages
  const [sharedMessage, setSharedMessage] = useState<string>("");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <CardList
              cards={cardData}
              favorites={favorites}
              onUpdateFavorites={updateFavorites}
              sharedMessage={sharedMessage}
              setSharedMessage={setSharedMessage}
            />
          }
        />

        <Route
          path="favorites"
          element={
            <Favorites
              favorites={favorites}
              onUpdateFavorites={updateFavorites}
              sharedMessage={sharedMessage}
              setSharedMessage={setSharedMessage}
            />
          }
        />

        <Route
          path="directory"
          element={
            <RomDirectory
              sharedMessage={sharedMessage}
              setSharedMessage={setSharedMessage}
            />
          }
        />

        <Route
          path="tracker"
          element={
            <ProgressTrackerPage
              trackedRoms={trackedRoms}
              setTrackedRoms={setTrackedRoms}
              sharedMessage={sharedMessage}
              setSharedMessage={setSharedMessage}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
