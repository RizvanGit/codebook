import { FC, useState } from "react";
import { startService as bundle } from "../../bundler";
import CodeEditor from "../monaco-editor/MonacoEditor";
import Resizable from "../Resizable/Resizable";
import Preview from "../Preview/Preview";
import styles from "./CodeCell.module.css";

const CodeCell: FC = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <Resizable direction="vertical">
      <section className={styles.container}>
        <Resizable direction="horizontal">
          <CodeEditor
            initValue="console.log(123)"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} />
      </section>
    </Resizable>
  );
};

export default CodeCell;
