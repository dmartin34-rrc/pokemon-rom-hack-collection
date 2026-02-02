// types
import type CardType from '../../../types/Card';

const CardImage = ({ img, title }: CardType) => {
  return <img className="rom-image" src={img} alt={title} />;
};

export default CardImage;
