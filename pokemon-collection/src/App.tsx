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

// data
import cardData from './data/cardData.json';

// hooks
import useFavorites from './hooks/useFavorites.ts';

// types
import type Rom from './types/Rom';

/**
 * App uses the hook-service-repository architecture by:
 * 
 * useFavorites() being a custom hook that manages favorites state in the form of a list of favorite ROM Titles.
 * 
 * This custom hook calls favoritesService to handle business logic for toggling favorites, and generating unique id's and timestamps.
 * 
 * favoritesRepo temporarily uses in-memory test data from favoriteData.json
 * and handles basic CRUD methods. This provides the service layer with data to keep shared state synced across the Home, Favorites, and Directory pages.
 */
function App() {
  const { favoriteTitles, toggleFavorite } = useFavorites();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <CardList
              cards={cardService.getCards()}
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

        <Route path="tracker" element={<ProgressTrackerPage />} />
      </Route>
    </Routes>
  );
}

export default App;