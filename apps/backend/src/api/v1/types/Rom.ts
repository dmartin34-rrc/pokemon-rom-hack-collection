import type CardType from './CardType';

export default interface Rom extends CardType {
  year?: number;
  completed?: boolean;
  multiplayer?: boolean;
  percentComplete?: number;
}
