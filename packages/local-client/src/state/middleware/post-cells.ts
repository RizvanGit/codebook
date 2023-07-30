import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { saveCells } from "../action-creators";
import { cellActions } from "../reducers/cellsReducer";

export const listenerMiddleware = createListenerMiddleware();

const { updateCell, moveCell, deleteCell, insertCellAfter } = cellActions;

listenerMiddleware.startListening({
  matcher: isAnyOf(updateCell, moveCell, deleteCell, insertCellAfter),
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    await listenerApi.delay(1000);
    await listenerApi.dispatch(saveCells());
  },
});
