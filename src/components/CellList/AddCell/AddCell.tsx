import { FC } from "react";
import { cellActions } from "../../../state";
import { useAppDispatch } from "../../../hooks";
import "./AddCell.css";
import FAButton from "../../UI/Button/Button";

interface IAddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}
const AddCell: FC<IAddCellProps> = ({ previousCellId, forceVisible }) => {
  const dispatch = useAppDispatch();
  const { insertCellAfter } = cellActions;

  return (
    <div className={`add-cell ${forceVisible ? "force-visible" : ""}`}>
      <div className="add-buttons">
        <FAButton
          className="button is-rounded is-primary is-small"
          onClick={() =>
            dispatch(insertCellAfter({ id: previousCellId, type: "code" }))
          }
          spanClass="icon is-small"
          iconClass="fas fa-plus"
        >
          Code
        </FAButton>
        <FAButton
          className="button is-rounded is-primary is-small"
          onClick={() =>
            dispatch(insertCellAfter({ id: previousCellId, type: "text" }))
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
