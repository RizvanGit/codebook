import { createAsyncThunk } from "@reduxjs/toolkit";
import { startService as bundle } from "../../bundler";
import axios from "axios";
import { FetchResponseType } from "../actions";
import { RootReducerState } from "../reducers";

export const bundleCode = createAsyncThunk(
  "code/bundle",
  async (input: { cellId: string; code: string }) => {
    const { cellId, code } = input;
    const response = await bundle(code);
    return {
      cellId,
      bundle: {
        code: response.code,
        error: response.error,
      },
    };
  }
);

export const fetchCells = createAsyncThunk("code/fetch", async () => {
  const result: FetchResponseType = {
    data: [],
    error: "",
  };
  try {
    result.data = await axios.get("/cells");

    return result;
  } catch (error) {
    if (error instanceof Error) {
      result.error = error.message;
      return result;
    } else {
      console.error(error);
    }
  }
});

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
