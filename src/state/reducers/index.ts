import { combineReducers } from "redux";
import { cellReducer } from "./cellsReducer";

const rootReducer = combineReducers({
  cells: cellReducer,
});

export default rootReducer;

export type RootReducerState = ReturnType<typeof rootReducer>;
