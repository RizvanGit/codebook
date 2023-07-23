import {
  createSlice,
  PayloadAction,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { bundleCode } from "../action-creators";
import { IBundle } from "../actions";

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
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IBundleState>) => {
    builder.addCase(bundleCode.pending, (state, actions) => {
      state[actions.meta.arg.cellId] = {
        loading: true,
        code: "",
        error: "",
      };
    });
    builder.addCase(
      bundleCode.fulfilled,
      (state, { payload }: PayloadAction<IBundle>) => {
        const { cellId, bundle } = payload;
        if (!state[cellId]) {
          state[cellId] = {
            loading: false,
            code: bundle.code,
            error: bundle.error,
          };
        } else {
          state[cellId].loading = false;
          state[cellId].error = bundle.error;
          state[cellId].code = bundle.code;
        }
      }
    );
  },
});

export const bundleReducer = bundleSlice.reducer;
export const bundleActions = bundleSlice.actions;
