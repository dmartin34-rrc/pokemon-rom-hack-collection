import type CardType from '../../../../../../pokemon-collection/src/types/Card';
import { cardRepository } from '../repositories/cardRepository';

class CardService {
  getCards(): CardType[] {
    return cardRepository.getAll();
  }

  toggleBookmark(title: string): void {
    const card = cardRepository.getByTitle(title);
    if (!card) return;

    cardRepository.update(title, { bookmark: !card.bookmark });
  }
}

export const cardService = new CardService();
