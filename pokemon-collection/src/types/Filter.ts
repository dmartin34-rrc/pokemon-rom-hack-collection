export default interface Filter {
  title: string;
  tags: string;
  yearMinimum: number;
  yearMaximum: number;
  filterMultiplayer: boolean | null;
  filterCompleted: boolean | null;
}
