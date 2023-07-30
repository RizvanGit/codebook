import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchResponseType } from "../actions";
import axios from "axios";

export const fetchCells = createAsyncThunk("code/fetch", async () => {
  const result: FetchResponseType = {
    data: [],
    error: "",
  };
  try {
    const response = await axios.get("/cells");
    result.data = response.data;
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
