// data
import cardData from '../../data/cardData.json';
import type CardType from '../../types/Card';
// components
import Card from './Card';

type CardListProps = {
  cards: CardType[];
  favorites: string[];
  onUpdateFavorites: (title: string) => void;
  sharedMessage: string;
  setSharedMessage: React.Dispatch<React.SetStateAction<string>>;
};

const CardList: React.FC<CardListProps> = ({
  favorites,
  onUpdateFavorites,
}): React.JSX.Element => {
  return (
    <>
      <div className="flex flex-wrap gap-6 justify-center">
        {cardData.map((card) => {
          return (
            <Card
              card={card}
              key={card.title}
              isFavorite={favorites.includes(card.title)}
              onUpdateFavorites={onUpdateFavorites}
            />
          );
        })}
      </div>
    </>
  );
};

export default CardList;
