import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBundleStart, IBundleCompele } from "../actions";

interface IBundleState {
  [key: string]: {
    loading: boolean;
    code: string;
    error: string;
  };
}

const initialState: IBundleState = {};

const bundleSlice = createSlice({
  name: "bundle",
  initialState,
  reducers: {
    bundleStart(state, action: PayloadAction<IBundleStart>) {
      state[action.payload.cellId] = {
        loading: true,
        code: "",
        error: "",
      };
      return state;
    },
    bundleComplete(state, action: PayloadAction<IBundleCompele>) {
      state[action.payload.cellId] = {
        loading: false,
        code: action.payload.bundle.code,
        error: action.payload.bundle.error,
      };
      return state;
    },
  },
});

export const bundleReducer = bundleSlice.reducer;
export const bundleActions = bundleSlice.actions;
