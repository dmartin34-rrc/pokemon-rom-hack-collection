export default interface Filter {
  tags: string;
  yearMinimum: number;
  yearMaximum: number;
  filterMultiplayer: boolean | null;
  filterCompleted: boolean | null;
}
