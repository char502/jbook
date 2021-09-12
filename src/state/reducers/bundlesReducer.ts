import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

export interface BundlesState {
  // The key will be an id of a particular cell
  // The value is going to be an object
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

// Initialise an empty state and have no bundles for any cells when begin
const initialState: BundlesState = {};

const reducer = produce(
  (state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: '',
          err: ''
        };
        return state;
      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err
        };
        return state;
      default:
        return state;
    }
  },
  initialState
);

export default reducer;
