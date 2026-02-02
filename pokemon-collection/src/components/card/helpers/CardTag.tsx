// types
import type CardType from '../../../types/Card';

const CardTag = ({ tags }: CardType) => {
  if (!tags) {
    return null;
  }

  return (
    <aside className="absolute bottom-4 left-4 flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <a
          className="bg-slate-500 text-white px-1 py-[0.2rem] rounded-[3px] tracking-[1px] hover:bg-slate-600"
          href="#"
          key={index}
        >
          {tag}
        </a>
      ))}
    </aside>
  );
};

export default CardTag;
