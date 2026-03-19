import type CardType from '../../../../../../pokemon-collection/src/types/Card';
import cardData from '../../../../../../pokemon-collection/src/data/cardData.json';

class CardRepository {
  private cards: CardType[] = [...(cardData as CardType[])];

  // READ
  getAll(): CardType[] {
    return this.cards;
  }

  getByTitle(title: string): CardType | undefined {
    return this.cards.find((c) => c.title === title);
  }

  // CREATE
  create(card: CardType): void {
    this.cards.push(card);
  }

  // UPDATE
  update(title: string, updated: Partial<CardType>): void {
    this.cards = this.cards.map((c) =>
      c.title === title ? { ...c, ...updated } : c,
    );
  }

  // DELETE
  delete(title: string): void {
    this.cards = this.cards.filter((c) => c.title !== title);
  }
}

export const cardRepository = new CardRepository();
