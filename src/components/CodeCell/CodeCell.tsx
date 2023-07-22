import { FC, useState, useEffect } from "react";
import { startService as bundle } from "../../bundler";
import CodeEditor from "../monaco-editor/MonacoEditor";
import Resizable from "../Resizable/Resizable";
import Preview from "../Preview/Preview";
import styles from "./CodeCell.module.css";
import { ICell } from "../../state";
import { useAppDispatch } from "../../hooks/use-typed-dispatch";
import { cellActions } from "../../state/reducers/cellsReducer";

interface ICodeCellProps {
  cell: ICell;
}
const CodeCell: FC<ICodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setError(output.error);
    }, 800);
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  const dispatch = useAppDispatch();
  const onChangeEditor = (value: string) => {
    dispatch(cellActions.updateCell({ id: cell.id, content: value }));
  };

  return (
    <div>
      <Resizable direction="vertical">
        <section className={styles.container}>
          <Resizable direction="horizontal">
            <CodeEditor initValue={cell.content} onChange={onChangeEditor} />
          </Resizable>
          <Preview code={code} bundleStatus={error} />
        </section>
      </Resizable>
    </div>
  );
};

export default CodeCell;
