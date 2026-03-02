import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// components
import Layout from './layouts/Layout.tsx';
import CardList from './components/card/CardList.tsx';
import RomDirectory from './pages/RomDirectoryPage.tsx';
import Favorites from './pages/Favorites.tsx';
import ProgressTrackerPage from './pages/ProgressTrackerPage.tsx';

// data
import cardData from './data/cardData.json';

// hooks
import useFavorites from './hooks/useFavorites.ts';

// types
import type Rom from './types/Rom';

function App() {
  const { favoriteTitles, toggleFavorite } = useFavorites();

  // tracker
  const [trackedRoms, setTrackedRoms] = useState<Rom[]>([]);

  // shared message across all pages
  const [sharedMessage, setSharedMessage] = useState<string>('');

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <CardList
              cards={cardData}
              favorites={favoriteTitles}
              onUpdateFavorites={toggleFavorite}
            />
          }
        />

        <Route
          path="favorites"
          element={
            <Favorites
              favorites={favoriteTitles}
              onUpdateFavorites={toggleFavorite}
            />
          }
        />

        <Route path="directory" element={<RomDirectory />} />

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
