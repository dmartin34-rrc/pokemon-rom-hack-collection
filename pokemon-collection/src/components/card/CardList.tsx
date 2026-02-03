// data
import cardData from '../../data/cardData.json';
// components
import Card from './card';

const CardList = ({
  cards = cardData,
  favorites = [],
  onUpdateFavorites
} : any ) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {cards.map((c: any) => {
        return (
          <Card
            card={c}
            key={c.title}
            isFavorite={favorites.includes(c.title)}
            onUpdateFavorites={onUpdateFavorites}
          />
        );
      })}
    </div>
  );
};

export default CardList;
