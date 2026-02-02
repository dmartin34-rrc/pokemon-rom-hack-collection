import type CardType from './Card';

export default interface Rom extends CardType {
  year?: number;
  completed?: boolean;
  multiplayer?: boolean;
}
