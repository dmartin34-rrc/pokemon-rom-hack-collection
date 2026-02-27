import { useState } from 'react';
// data
import cardData from '../data/cardData.json';
// types
import type CardType from '../types/Card';
// components
import CardList from '../components/card/CardList';
import SearchBar from '../layouts/header/SearchBar';

type FavoritesProps = {
  favorites: string[];
  onUpdateFavorites: (title: string) => void;
};

const Favorites: React.FC<FavoritesProps> = ({
  favorites,
  onUpdateFavorites,
}): React.JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');

  const favoriteCards = cardData.filter(
    (card: CardType) => card.title && favorites.includes(card.title),
  );

  const displayedCards = favoriteCards.filter((card) =>
    card.title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="max-w-[1100px] mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 font-[Oxygen]">My Favorites</h2>
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search favorites..."
      />

      {favorites.length === 0 ? (
        <p className="text-gray-500 mt-4">You have no favorites.</p>
      ) : displayedCards.length === 0 ? (
        <p className="text-gray-500 mt-4">No favorites match.</p>
      ) : (
        <CardList
          cards={displayedCards}
          favorites={favorites}
          onUpdateFavorites={onUpdateFavorites}
        />
      )}
    </main>
  );
};

export default Favorites;
