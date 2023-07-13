import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";
const fileCache = localForage.createInstance({
  name: "codebook",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      //Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: inputCode,
          };
        }
        //Check if we already fetched this file
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path,
        );
        if (cachedResult) {
          return cachedResult;
        }

        const { data, request } = await axios.get(args.path);
        const fileType = args.path.match(/.css$/) ? "css" : "jsx";
        console.log("file type ", fileType);

        const contents =
          fileType === "css"
            ? `
          const style = document.createElement('style');
          style.innerText = \`${data}\`;
          document.head.appendChild(style);
        `
            : data;
        //store response in indexedDB
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
