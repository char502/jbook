import { statement } from '@babel/template';
import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {}
};

const reducer = produce(
  (state: CellsState = initialState, action: Action): CellsState | void => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        // simplified logic with Immer, access the
        // content property and make an update to it
        // with Immer not returning a value and don't have to
        // because Immer is just going to automatically
        // figure out the updates we have made and return an
        // object for us
        state.data[id].content = content;
        return;

      // example without immer
      // case ActionType.UPDATE_CELL:
      //   // Find the appropriate cell and update its contents
      //   // inside of the state object.
      //   // Here, will override what is at action.payload.id
      //   // can use as refactor but keeping in this case for reference
      //   // const { id, content } = action.payload;
      //   return {
      //     ...state,
      //     data: {
      //       ...state.data,
      //       // the id of the cell to be updated
      //       // the content for this will be overwritten
      //       [action.payload.id]: {
      //         // below is the cell object itself
      //         // extract all the properties from that
      //         // and add it to a new object
      //         ...state.data[action.payload.id],
      //         // then overwrite its content property
      //         content: action.payload.content
      //       }
      //     }
      //   };

      case ActionType.DELETE_CELL:
        // action.payload in this case is the id
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);
        return;

      case ActionType.MOVE_CELL:
        const { direction } = action.payload;

        const index = state.order.findIndex((id) => id === action.payload.id);

        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return;
        }

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;

        return;

      case ActionType.INSERT_CELL_BEFORE:
        return state;

      default:
        return state;
    }
  }
);

export default reducer;
