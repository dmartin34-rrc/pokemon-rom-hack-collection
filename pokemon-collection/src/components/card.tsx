import cards from '../data/card.json'
import type { Card } from '../types/cards';

export default function Card({title}: Pick<Card, "title">) {
    const card = cards.find(c => c.title == title )

    if (!card) {
        return null;
      }
    
    return (
      <>
        <div className="card-container">
          <div className="feature-rom-container">
            <div>
              <a className="feature-rom-link">
                <span>
                  <CardImage card={card} />
                  <CardTag card={card} />
                </span>
              </a>
            </div>
          </div>
          <div className="rom-title-container">
            <CardTitle card={card}/>
          </div>
          <div className="rom-description">
            <CardDescription card={card} />
          </div>
        </div>
      </>
    );
  }

//   <CardImage card=""/>
function CardImage({card}: {card: Card}) {    
    return (
        <img className="rom-image" src={card.img} alt={card.title}/>
    )
}

function CardTitle({card}: {card: Card}) {
    return (
        <h3 className="rom-title">
        <a className="title-link">{card.title}</a>
        <span className="bookmark"></span>
      </h3>
    )
}

function CardTag({card}: {card: Card}) {
    return (
        <aside className="rom-tags">
        <a href="#">{card.tags[0]}</a>
        <a href="#">{card.tags[1]}</a>
      </aside>
    )
}

function CardDescription({card}: {card: Card}) {
    return (
        <p>{card.description}</p>
    )
}