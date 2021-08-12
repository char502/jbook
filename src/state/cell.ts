export type CellTypes = 'code' | 'text';

export interface Cell {
  id: string;
  type: CellTypes;
  constent: string;
}
