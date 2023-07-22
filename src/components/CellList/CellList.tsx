import { FC, Fragment } from "react";
import { useAppSelector } from "../../hooks";
import CellListItem from "./CellListItem/CellListItem";
import AddCell from "./AddCell/AddCell";

const CellList: FC = () => {
  const cellState = useAppSelector((state) => state.cells);
  const cells = cellState.order.map((id) => cellState.data[id]);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));
  return (
    <ul>
      <AddCell previousCellId={null} forceVisible={cells.length === 0} />
      {renderedCells}
    </ul>
  );
};

export default CellList;
