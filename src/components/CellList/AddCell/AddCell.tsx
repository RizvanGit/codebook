import { FC } from "react";
import { cellActions } from "../../../state/reducers/cellsReducer";
import { useAppDispatch } from "../../../hooks/use-typed-dispatch";
import "./AddCell.css";

interface IAddCellProps {
  nextCellId: string | null;
}
const AddCell: FC<IAddCellProps> = ({ nextCellId }) => {
  const dispatch = useAppDispatch();
  const { insertCellBefore } = cellActions;

  return (
    <div className="add-cell">
      <button
        onClick={() =>
          dispatch(insertCellBefore({ id: nextCellId, type: "code" }))
        }
      >
        Code
      </button>
      <button
        onClick={() =>
          dispatch(insertCellBefore({ id: nextCellId, type: "text" }))
        }
      >
        Text
      </button>
    </div>
  );
};

export default AddCell;
