import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { bundleCode, cellActions } from "../../state";
import { ICell } from "../../state";
import CodeEditor from "../monaco-editor/MonacoEditor";
import Resizable from "../Resizable/Resizable";
import Preview from "../Preview/Preview";
import styles from "./CodeCell.module.css";

interface ICodeCellProps {
  cell: ICell;
}
const CodeCell: FC<ICodeCellProps> = ({ cell }) => {
  const dispatch = useAppDispatch();
  const bundle = useAppSelector((state) => state.bundle[cell.id]);
  console.log(bundle);
  useEffect(() => {
    const timer = setTimeout(async () => {
      dispatch(bundleCode({ cellId: cell.id, code: cell.content }));
    }, 800);
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content, cell.id, dispatch]);

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
          {bundle && <Preview code={bundle.code} bundleStatus={bundle.error} />}
        </section>
      </Resizable>
    </div>
  );
};

export default CodeCell;
