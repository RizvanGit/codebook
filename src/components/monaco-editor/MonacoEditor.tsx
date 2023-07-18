import { FC } from "react";
import { Editor, OnChange } from "@monaco-editor/react";

type ICodeProps = {
  onChange: OnChange;
  initValue: string;
};

const CodeEditor: FC<ICodeProps> = ({ initValue, onChange }) => {
  return (
    <Editor
      value={initValue}
      onChange={onChange}
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
