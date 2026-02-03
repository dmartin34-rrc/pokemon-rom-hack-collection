import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
// components
import Layout from './components/common/Layout.tsx';
import CardList from './components/card/CardList.tsx';
import RomDirectory from './components/directory/RomDirectory.tsx';
// data
import cardData from './data/cardData.json';
import Favorites from './components/pages/Favorites.tsx';

function App() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const updateFavorites = (title: string) => {
    if (favorites.includes(title)) {
        setFavorites(favorites.filter(t => t !== title));
    } else {
        setFavorites([...favorites, title]);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={
          <CardList
            cards={cardData}
            favorites={favorites}
            onUpdateFavorites={updateFavorites}
          />
        } />

        <Route path="favorites" element={
          <Favorites
            favorites={favorites}
            onUpdateFavorites={updateFavorites}
          />
        } />

        <Route path="directory" element={<RomDirectory />} />
      </Route>
    </Routes>
  );
}

export default App;
