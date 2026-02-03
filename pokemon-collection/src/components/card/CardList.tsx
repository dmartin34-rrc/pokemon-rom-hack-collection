// data
import cardData from '../../data/cardData.json';
// components
import Card from './card';

const CardList = () => {
  return cardData.map((c) => {
    return <Card title={c.title} key={c.title} />;
  });
};

export default CardList;
