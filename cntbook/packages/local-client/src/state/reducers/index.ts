import { combineReducers } from "redux";
import { cellReducer } from "./cellsReducer";
import { bundleReducer } from "./bundleReducer";

const rootReducer = combineReducers({
  cells: cellReducer,
  bundle: bundleReducer,
});

export default rootReducer;

export type RootReducerState = ReturnType<typeof rootReducer>;
