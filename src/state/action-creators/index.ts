import { createAsyncThunk } from "@reduxjs/toolkit";
import { startService as bundle } from "../../bundler";

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
