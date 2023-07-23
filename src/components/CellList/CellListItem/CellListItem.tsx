import { FC, Fragment } from "react";
import CodeCell from "../../CodeCell/CodeCell";
import ActionBar from "../../ActionBar/ActionBar";
import TextEditor from "../../TextEditor/TextEditor";
import { ICell } from "../../../state";
import "./CellListItem.css";

interface ICellItemProps {
  cell: ICell;
}
const CellListItem: FC<ICellItemProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === "code") {
    child = <CodeCell cell={cell} />;
  } else {
    child = <TextEditor cell={cell} />;
  }
  return (
    <li className="cell-list-item">
      <ActionBar id={cell.id} />
      <Fragment>{child}</Fragment>
    </li>
  );
};

export default CellListItem;
