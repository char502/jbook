import { combineReducers } from 'redux';
import cellsReducer from './cellsReducer';
import bundlesReducer from './bundlesReducer';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer
});

export default reducers;

// This makes use of a built in helper inside of typescript to say
// take the 'reducer' function and give us back the type of whatever
// that function returns
// then assign this to 'RootState'
export type RootState = ReturnType<typeof reducers>;
