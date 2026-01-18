import cards from '../data/card.json'
import type { Card } from '../types/cards';

export default function Card() {
    return (
      <>
        <div className="card-container">
          <div className="feature-rom-container">
            <div>
              <a className="feature-rom-link">
                <span>
                  <CardImage title="Pokemon Infinity" />
                  <CardTag title="Pokemon Infinity" />
                </span>
              </a>
            </div>
          </div>
          <div className="rom-title-container">
            <CardTitle title="Pokemon Infinity" />
          </div>
          <div className="rom-description">
            <CardDescription title="Pokemon Infinity" />
          </div>
        </div>
      </>
    );
  }

function CardImage({title}: Pick<Card, "title">) {
    const card = cards.find(c => c.title == title )

    if (!card) {
        return null;
      }
    
    return (
        <img className="rom-image" src={card.img} alt={card.title}/>
    )
}

function CardTitle({title}: Pick<Card, "title">) {
    const card = cards.find(c => c.title == title )

    if (!card) {
        return null;
      }

    return (
        <h3 className="rom-title">
        <a className="title-link">{card.title}</a>
        <span className="bookmark"></span>
      </h3>
    )
}

function CardTag({title}: Pick<Card, "title">) {
    const card = cards.find(c => c.title == title )

    if (!card) {
        return null;
      }

    return (
        <aside className="rom-tags">
        <a href="#">{card.tags[0]}</a>
        <a href="#">{card.tags[1]}</a>
      </aside>
    )
}

function CardDescription({title}: Pick<Card, "title">) {
    const card = cards.find(c => c.title == title )

    if (!card) {
        return null;
      }

    return (
        <p>{card.description}</p>
    )
}