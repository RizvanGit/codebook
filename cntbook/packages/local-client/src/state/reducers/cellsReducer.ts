import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setRandomId } from "../../utils/random-id";
import {
  DIRECTIONS,
  IDeleteCell,
  IInsertCellAfter,
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
    moveCell(state, action: PayloadAction<IMoveCell>) {
      const { direction, id: payloadId } = action.payload;
      const index = state.order.findIndex((id) => id === payloadId);
      const targetIndex = direction === DIRECTIONS.UP ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = payloadId;
    },
    insertCellAfter(state, action: PayloadAction<IInsertCellAfter>) {
      const { id: payloadId, type } = action.payload;
      const cell: ICell = {
        id: setRandomId(),
        type: type,
        content: "",
      };
      state.data[cell.id] = cell;

      const index = state.order.findIndex((id) => id === payloadId);
      if (index < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(index + 1, 0, cell.id);
      }
    },
    deleteCell(state, action: PayloadAction<IDeleteCell>) {
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
    },
  },
});

export const cellReducer = cellSlice.reducer;
export const cellActions = cellSlice.actions;
