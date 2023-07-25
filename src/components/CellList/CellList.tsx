import { FC, Fragment, memo, useMemo } from "react";
import { useAppSelector } from "../../hooks";
import CellListItem from "./CellListItem/CellListItem";
import AddCell from "./AddCell/AddCell";
import { ICell } from "../../state";

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
  const cellsMemo = useMemo(() => cells, [cells]);
  const renderedCells = cellsMemo.map((cell) => {
    return <MemoListItem cell={cell} key={cell.id} />;
  });
  return (
    <ul>
      <AddCell previousCellId={null} forceVisible={cells.length === 0} />
      {renderedCells}
    </ul>
  );
};

export default CellList;
