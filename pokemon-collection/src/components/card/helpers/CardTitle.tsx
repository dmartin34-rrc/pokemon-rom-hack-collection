// types
import type CardType from '../../../types/Card';

const CardTitle = ({ title }: CardType) => {
  return (
    <h3 className="rom-title">
      <a>{title}</a>
    </h3>
  );
};

export default CardTitle;
