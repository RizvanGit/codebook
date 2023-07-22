import { FC, useRef } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import MonacoJSXHighlighter from "monaco-jsx-highlighter";
import parserBabel from "prettier/parser-babel";
import prettier from "prettier";
import traverse from "@babel/traverse";
import { parse } from "@babel/parser";
import "./MonacoEditor.css";
import "./syntax.css";

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
    const highlightedText = new MonacoJSXHighlighter(
      // @ts-ignore
      window.monaco,
      parse,
      traverse,
      monacoEditor
    );
    highlightedText.highlightOnDidChangeModelContent(100);
    highlightedText.addJSXCommentCommand();
  };
  const onFormatCode = () => {
    const unformatted = editorRef.current.getModel().getValue();

    try {
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
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        throw error;
      }
    }
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
        height="100%"
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
