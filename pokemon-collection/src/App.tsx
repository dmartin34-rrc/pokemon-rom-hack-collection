import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// components
import Layout from './layouts/Layout';
import CardList from './components/card/CardList';
import RomDirectory from './pages/RomDirectoryPage';
import Favorites from './pages/Favorites';
import ProgressTrackerPage from './pages/ProgressTrackerPage';

// service
import { cardService } from './services/cardService';

function App() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const updateFavorites = (title: string) => {
    setFavorites((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <CardList
              cards={cardService.getCards()}
              favorites={favorites}
              onUpdateFavorites={updateFavorites}
            />
          }
        />

        <Route
          path="favorites"
          element={
            <Favorites
              favorites={favorites}
              onUpdateFavorites={updateFavorites}
            />
          }
        />

        <Route path="directory" element={<RomDirectory />} />

        <Route path="tracker" element={<ProgressTrackerPage />} />
      </Route>
    </Routes>
  );
}

export default App;