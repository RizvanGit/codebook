import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  IDeleteCell,
  IInsertCellBefore,
  IMoveCell,
  IUpdateCell,
} from "../actions";
import { ICell } from "../cell-type";

interface ICellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: ICell;
  };
}

const initialState: ICellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    updateCell(state, action: PayloadAction<IUpdateCell>) {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
    moveCell(state, action: PayloadAction<IMoveCell>) { },
    insertCellBefore(state, action: PayloadAction<IInsertCellBefore>) { },
    deleteCell(state, action: PayloadAction<IDeleteCell>) { },
  },
});

export const cellReducer = cellSlice.reducer;
export const cellActions = cellSlice.actions;
