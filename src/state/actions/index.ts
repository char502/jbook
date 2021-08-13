import { ActionType } from '../action-types';
import { CellTypes } from '../cell';

interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}
interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: 'up' | 'down';
  };
}

interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string;
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
