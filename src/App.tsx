import * as esbuild from "esbuild-wasm";
import { FC, useState, useEffect, useRef } from "react";
import "./App.css";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/monaco-editor/MonacoEditor";

const App: FC = () => {
  const [input, setInput] = useState("");
  const ref = useRef<any>();
  const iframeRef = useRef<any>();
  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };
  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    iframeRef.current.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
    //setCode(result.outputFiles[0].text);
    iframeRef.current.contentWindow.postMessage(
      result.outputFiles[0].text,
      "*",
    );
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener("message", (event) => {
                try{
                  eval(event.data)
                } catch(error){
                  const root = document.getElementById('root')
                  root.innerHTML = '<div style="color: red; font-weight: 500"><h4>Runtime error</h4>' + error + '</div>'
                  console.error(error)
                }
              }, false)
        </script>
      </body>
    </html>
    `;

  return (
    <section>
      <div>
        <CodeEditor />
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
        ></textarea>
        <div>
          <button onClick={onClick}>Submit</button>
        </div>
        <iframe
          ref={iframeRef}
          srcDoc={html}
          title="codebox"
          sandbox="allow-scripts"
        />
      </div>
    </section>
  );
};

export default App;
