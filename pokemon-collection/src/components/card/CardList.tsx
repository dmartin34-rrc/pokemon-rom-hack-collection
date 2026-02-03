// data
import cardData from '../../data/cardData.json';
// components
import Card from './card';

const CardList = ({
  cards = cardData,
  favorites = [],
  onUpdateFavorites
} : any ) => {
  return cards.map((c: any) => {
    return (
    <Card
      card={c} 
      key={c.title}
      isFavorite={favorites.includes(c.title)}
      onUpdateFavorites={onUpdateFavorites}
    />
    );
  });
};

export default CardList;
