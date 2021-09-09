import { ActionType } from '../action-types';
import { CellTypes } from '../cell';

export type Direction = 'up' | 'down';
export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}
export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  // the id of the cell you want to delete
  payload: string;
}
export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}
export interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

// type which is a union of all the above types
// '|' means 'union of' in ts
export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellBeforeAction
  | UpdateCellAction;
