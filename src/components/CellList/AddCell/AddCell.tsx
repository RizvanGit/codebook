import { FC } from "react";
import { cellActions } from "../../../state/reducers/cellsReducer";
import { useAppDispatch } from "../../../hooks/use-typed-dispatch";
import "./AddCell.css";
import FAButton from "../../UI/Button/Button";

interface IAddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean;
}
const AddCell: FC<IAddCellProps> = ({ nextCellId, forceVisible }) => {
  const dispatch = useAppDispatch();
  const { insertCellBefore } = cellActions;

  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <FAButton
          className="button is-rounded is-primary is-small"
          onClick={() =>
            dispatch(insertCellBefore({ id: nextCellId, type: "code" }))
          }
          spanClass="icon is-small"
          iconClass="fas fa-plus"
        >
          Code
        </FAButton>
        <FAButton
          className="button is-rounded is-primary is-small"
          onClick={() =>
            dispatch(insertCellBefore({ id: nextCellId, type: "text" }))
          }
          spanClass="icon is-small"
          iconClass="fas fa-plus"
        >
          Text
        </FAButton>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
