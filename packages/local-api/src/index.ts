/* eslint-disable */
import express from "express";

export const serve = (port: number, filename: string, dir: string) => {
  const app = express();
  console.log("Listening on port: ", port);
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
