import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootReducerState } from "../reducers";
import axios from "axios";

export const saveCells = createAsyncThunk(
  "code/save",
  async (payload, { getState }) => {
    const state = getState() as RootReducerState;
    const {
      cells: { order, data },
    } = state;

    const cells = order.map((id) => data[id]);
    try {
      await axios.post("/cells", { cells });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  }
);
