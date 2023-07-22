import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { cellActions } from "./reducers/cellsReducer";

export const store = configureStore({ reducer: rootReducer });
export type AppDispatch = typeof store.dispatch;

store.dispatch(
  cellActions.insertCellAfter({
    id: null,
    type: "code",
  })
);
store.dispatch(
  cellActions.insertCellAfter({
    id: null,
    type: "text",
  })
);
