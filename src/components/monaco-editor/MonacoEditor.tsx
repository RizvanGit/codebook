import { FC } from "react";
import MonacoEditor from "@monaco-editor/react";

type ICodeProps = {
  onChange: (value: string) => void;
  value: string;
};

const CodeEditor: FC = () => {
  return (
    <MonacoEditor
      height="200px"
      theme="vs-dark"
      defaultLanguage="javascript"
      options={{
        tabIndex: 2,
        wordWrap: "on",
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        showUnused: false,
        automaticLayout: true,
        minimap: { enabled: false },
      }}
    />
  );
};

export default CodeEditor;
