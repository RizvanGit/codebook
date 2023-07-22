import { FC } from "react";
import { useAppSelector } from "../../hooks/use-typed-selector";
import CellListItem from "./CellListItem/CellListItem";
import AddCell from "./AddCell/AddCell";

const CellList: FC = () => {
  const cellState = useAppSelector((state) => state.cells);
  const cells = cellState.order.map((id) => cellState.data[id]);

  const renderedCells = cells.map((cell) => (
    <div key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </div>
  ));
  return (
    <ul>
      {renderedCells}
      <AddCell nextCellId={null} />
    </ul>
  );
};

export default CellList;
