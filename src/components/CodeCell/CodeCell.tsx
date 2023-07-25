import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { bundleCode, cellActions } from "../../state";
import { ICell } from "../../state";
import CodeEditor from "../monaco-editor/MonacoEditor";
import Resizable from "../Resizable/Resizable";
import Preview from "../Preview/Preview";
import "./CodeCell.css";

interface ICodeCellProps {
  cell: ICell;
}
const CodeCell: FC<ICodeCellProps> = ({ cell }) => {
  const dispatch = useAppDispatch();
  const bundle = useAppSelector((state) => state.bundle[cell.id]);
  const allCellsUpToTheCurrent = useAppSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const combinedCode = [];
    for (let code of orderedCells) {
      if (code.type === "code") {
        combinedCode.push(code.content);
      }
      if (code.type === cell.id) {
        break;
      }
    }
    return combinedCode;
  });
  console.log(allCellsUpToTheCurrent);
  const isBundle = !!bundle;
  useEffect(() => {
    if (!isBundle) {
      dispatch(
        bundleCode({ cellId: cell.id, code: allCellsUpToTheCurrent.join("\n") })
      );
      return;
    }
    const timer = setTimeout(async () => {
      dispatch(
        bundleCode({ cellId: cell.id, code: allCellsUpToTheCurrent.join("\n") })
      );
    }, 800);
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content, cell.id, dispatch, isBundle]);

  const onChangeEditor = (value: string) => {
    dispatch(cellActions.updateCell({ id: cell.id, content: value }));
  };

  return (
    <>
      <Resizable direction="vertical">
        <section className="code-section">
          <Resizable direction="horizontal">
            <CodeEditor initValue={cell.content} onChange={onChangeEditor} />
          </Resizable>
          <div className="previewWrapper">
            {!isBundle || bundle.loading ? (
              <div className="progressCover">
                <progress className="progress is-small is-primary" max="100">
                  Loading
                </progress>
              </div>
            ) : (
              <Preview code={bundle.code} bundleStatus={bundle.error} />
            )}
          </div>
        </section>
      </Resizable>
    </>
  );
};

export default CodeCell;
