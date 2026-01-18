import card from '../data/card.json'

export default function Card() {
    return (
      <>
        <div className="card-container">
          <div className="feature-rom-container">
            <div>
              <a className="feature-rom-link">
                <span>
                  <img className="rom-image" src={card[1].img} />
                  <aside className="rom-tags">
                    <a href="#">{card[1].tags[0]}</a>
                    <a href="#">{card[1].tags[1]}</a>
                  </aside>
                </span>
              </a>
            </div>
          </div>
          <div className="rom-title-container">
            <h3 className="rom-title">
              <a className="title-link">{card[1].title}</a>
              <span className="bookmark"></span>
            </h3>
          </div>
          <div className="rom-description">
            <p>{card[1].description}</p>
          </div>
        </div>
      </>
    );
  }