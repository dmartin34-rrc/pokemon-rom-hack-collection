import './Card.css';
// data
import cardData from '../../data/cardData.json';
// types
import type CardType from '../../types/Card';
// components
import CardTitle from './helpers/CardTitle';
import CardImage from './helpers/CardImage';
import CardDescription from './helpers/CardDescription';
import CardTag from './helpers/CardTag';

const Card = ({ title }: CardType) => {
  const card = cardData.find((c) => {
    return c.title === title;
  });

  if (!card) {
    return null;
  }

  return (
    <>
      <div className="card-container">
        <CardTitle title={card.title} />
        <div className="feature-container">
          <CardImage img={card.img} title={card.title} />
          <CardTag tags={card.tags} />
        </div>
        <CardDescription description={card.description} />
      </div>
    </>
  );
};

export default Card;
