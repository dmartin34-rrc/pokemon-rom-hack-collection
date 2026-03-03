export default interface CardType {
  title: string;
  description?: string;
  tags?: string[];
  img?: string;
  bookmark?: boolean;
  year?: number;
  completed?: boolean;
  multiplayer?: boolean;
}
