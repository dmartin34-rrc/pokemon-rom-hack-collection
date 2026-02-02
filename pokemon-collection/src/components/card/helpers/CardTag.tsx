// types
import type CardType from '../../../types/Card';

const CardTag = ({ tags }: CardType) => {
  if (!tags) {
    return null;
  }

  return (
    <aside className="rom-tags">
      {tags.map((tag, index) => (
        <a href="#" key={index}>
          {tag}
        </a>
      ))}
    </aside>
  );
};

export default CardTag;
