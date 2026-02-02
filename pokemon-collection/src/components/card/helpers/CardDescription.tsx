// types
import type CardType from '../../../types/Card';

const CardDescription = ({ description }: CardType) => {
  return <p>{description}</p>;
};

export default CardDescription;
