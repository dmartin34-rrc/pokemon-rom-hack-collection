import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';

// layouts / pages
import Layout from './layouts/Layout';
import RomDirectory from './pages/RomDirectoryPage';
import Favorites from './pages/Favorites';
import ProgressTrackerPage from './pages/ProgressTrackerPage';
import SignInPage from './pages/SignIn.tsx';
import UploadRomPage from './pages/UploadRomPage';

// components
import CardList from './components/card/CardList';

// service
import { cardService } from '../../backend/src/api/v1/services/cardService.ts';
import { getSeedRoms } from './apis/romRepo';
import type CardType from '../../../shared/types/CardType.ts';

// hooks
import useFavorites from './hooks/useFavorites.ts';

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
  const { favoriteRomIds, toggleFavorite } = useFavorites();
  const [homeRoms, setHomeRoms] = useState<CardType[]>(cardService.getCards());

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const romCatalog = await getSeedRoms();

        setHomeRoms(romCatalog);
      } catch {
        setHomeRoms(cardService.getCards());
      }
    };

    void loadCatalog();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <CardList
              cards={homeRoms}
              favoriteRomIds={favoriteRomIds}
              onUpdateFavorites={toggleFavorite}
            />
          }
        />

        <Route
          path="favorites"
          element={
            <>
              <SignedIn>
                <Favorites
                  favoriteRomIds={favoriteRomIds}
                  onUpdateFavorites={toggleFavorite}
                />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route path="directory" element={<RomDirectory />} />

        <Route path="tracker" element={<ProgressTrackerPage />} />

        <Route path="login" element={<SignInPage />} />

        <Route path="upload" element={<UploadRomPage />} />
      </Route>
    </Routes>
  );
}

export default App;
