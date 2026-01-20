import cards from '../data/card.json'
import type { Card } from '../types/cards';
import './Card.css'

export function CardList() {
    return cards.map(card => {
        return (

        <div className="card-container" key={card.title}>
          <div className="feature-rom-container">
            <div className="feature-rom">
              <a className="feature-rom-link">
                <CardImage card={card} />
              </a>
              <CardTag card={card} />
            </div>
          </div>
          <div className="rom-title-container">
            <CardTitle card={card}/>
          </div>
          <div className="rom-description">
            <CardDescription card={card} />
          </div>
        </div>
        )
    })
}

export function Card({title}: Pick<Card, "title">) {
    const card = cards.find(c => c.title == title )

    if (!card) {
        return null;
      }
    
    return (
      <>
        <div className="card-container">
          <div className="feature-rom-container">
            <div className="feature-rom">
              <a className="feature-rom-link">
                  <CardImage card={card} />
              </a>
              <span>
                  <CardTag card={card} />
              </span>
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
          {card.tags.map((tag, index) => (
            <a href="#" key={index}>{tag}</a>
          ))}
      </aside>
    )
}

function CardDescription({card}: {card: Card}) {
    return (
        <p>{card.description}</p>
    )
}