/* eslint-disable */
import express from "express";
import fs from "fs/promises";
import path from "path";

interface ICell {
  id: string;
  content: string;
  type: "text" | "code";
}
interface ILocalApiError {
  code: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());
  const fullPath = path.join(dir, filename);

  router.get("/cells", async (request, response) => {
    const isLocalApiError = (error: any): error is ILocalApiError => {
      return typeof error.code === "string";
    };

    try {
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });

      response.send(JSON.parse(result));
    } catch (error) {
      if (isLocalApiError(error)) {
        if (error.code === "ENOENT") {
          await fs.writeFile(fullPath, "[]", "utf-8");
          response.send([]);
        }
      } else {
        throw error;
      }
    }
  });

  router.post("/cells", async (request, response) => {
    const { cells }: { cells: ICell[] } = request.body;

    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

    response.send({ status: "ok" });
  });

  return router;
};
