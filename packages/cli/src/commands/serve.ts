/* eslint-disable */
import path from "path";
import { Command } from "commander";
import { serve } from "local-api";

interface ILocalApiError {
  code: string;
}
const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    const isLocalApiError = (err: any): err is ILocalApiError => {
      return typeof err.code === "string";
    };
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction,
      );
      console.log(
        `
         Opened ${filename}.
         Navigate to http://localhost:${options.port} to edit the file
        `,
      );
    } catch (error) {
      if (isLocalApiError(error)) {
        if (error.code === "EADDRINUSE") {
          console.log(
            `Port ${options.port} is in use. Try running different port: --port`,
          );
        }
      } else if (error instanceof Error) {
        console.log("Error: ", error.message);
      } else {
        console.log(error);
      }
      process.exit(1);
    }
  });
