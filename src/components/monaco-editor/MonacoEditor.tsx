import { FC, useRef } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";
import "./MonacoEditor.css";

type ICodeProps = {
  onChange(value: string): void;
  initValue: string;
};

const CodeEditor: FC<ICodeProps> = ({ initValue, onChange }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };
  const onFormatCode = () => {
    const unformatted = editorRef.current.getModel().getValue();

    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parserBabel],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");
    editorRef.current.setValue(formatted);
  };
  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatCode}
      >
        Format
      </button>
      <MonacoEditor
        value={initValue}
        editorDidMount={onEditorDidMount}
        height="200px"
        theme="vs-dark"
        language="javascript"
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
    </div>
  );
};

export default CodeEditor;
