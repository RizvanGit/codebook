import { FC, Fragment, memo, useMemo, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { fetchCells } from "../../state/action-creators";
import CellListItem from "./CellListItem/CellListItem";
import AddCell from "./AddCell/AddCell";
import { ICell } from "../../state";
import "./CellList.css";

const MemoListItem: FC<{ cell: ICell }> = memo(({ cell }) => {
  const cellMemo = useMemo(() => cell, [cell]);
  return (
    <Fragment key={cell.id}>
      <CellListItem cell={cellMemo} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  );
});
const CellList: FC = () => {
  const cellState = useAppSelector((state) => state.cells);
  const cells = cellState.order.map((id) => cellState.data[id]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCells());
  }, [dispatch]);

  const cellsMemo = useMemo(() => cells, [cells]);
  const renderedCells = cellsMemo.map((cell) => {
    return <MemoListItem cell={cell} key={cell.id} />;
  });
  return (
    <ul className="cell-list">
      <AddCell previousCellId={null} forceVisible={cells.length === 0} />
      {renderedCells}
    </ul>
  );
};

export default CellList;
