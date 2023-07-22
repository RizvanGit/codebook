import { FC } from "react";
import CodeCell from "../../CodeCell/CodeCell";
import ActionBar from "../../ActionBar/ActionBar";
import TextEditor from "../../TextEditor/TextEditor";
import { ICell } from "../../../state";

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
    <li>
      <ActionBar id={cell.id} />
      <div>{child}</div>
    </li>
  );
};

export default CellListItem;
