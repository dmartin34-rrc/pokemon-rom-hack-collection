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
                  <aside className="rom-tags">
                    <a href="#">{cards[1].tags[0]}</a>
                    <a href="#">{cards[1].tags[1]}</a>
                  </aside>
                </span>
              </a>
            </div>
          </div>
          <div className="rom-title-container">
            <CardTitle title="PokeSouls" />
          </div>
          <div className="rom-description">
            <p>{cards[1].description}</p>
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