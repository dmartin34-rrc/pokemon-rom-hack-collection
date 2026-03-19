import type CardType from '../../../../../../shared/types/CardType';

export default interface Rom extends CardType {
  year?: number;
  completed?: boolean;
  multiplayer?: boolean;
  percentComplete?: number;
}
