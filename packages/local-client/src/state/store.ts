import { configureStore } from "@reduxjs/toolkit";
import { listenerMiddleware } from "./middleware";
import rootReducer from "./reducers";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().prepend(listenerMiddleware.middleware);
  },
});
export type AppDispatch = typeof store.dispatch;
