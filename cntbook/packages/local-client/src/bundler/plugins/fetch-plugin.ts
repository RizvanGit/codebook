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
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      });
      //if onload return nothing (or null) esbuild will go on for another mathing filter
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        //Check if we already fetched this file
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path,
        );
        if (cachedResult) {
          return cachedResult;
        }
      });
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const contents = `
          const style = document.createElement('style');
          style.innerText = \`${data}\`;
          document.head.appendChild(style);
        `;
        //store response in indexedDB
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);
        return result;
      });
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
