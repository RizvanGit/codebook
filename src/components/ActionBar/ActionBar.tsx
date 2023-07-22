import { FC, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/use-typed-dispatch";
import { cellActions } from "../../state/reducers/cellsReducer";
import { DIRECTIONS } from "../../state/actions";
import FAButton from "../UI/Button/Button";
import "./ActionBar.css";

interface IActionBarProps {
  id: string;
}

const ActionBar: FC<IActionBarProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { moveCell, deleteCell } = cellActions;
  const [classes, setClasses] = useState("action-bar wave");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setClasses("action-bar");
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div className={classes}>
      <FAButton
        onClick={() => dispatch(moveCell({ id, direction: DIRECTIONS.UP }))}
        className="button is-primary is-small"
        spanClass="icon"
        iconClass="fas fa-arrow-up"
      />
      <FAButton
        onClick={() => dispatch(moveCell({ id, direction: DIRECTIONS.DOWN }))}
        className="button is-primary is-small"
        spanClass="icon"
        iconClass="fas fa-arrow-down"
      />
      <FAButton
        onClick={() => dispatch(deleteCell(id))}
        className="button is-primary is-small"
        spanClass="icon"
        iconClass="fas fa-times"
      />
    </div>
  );
};

export default ActionBar;
