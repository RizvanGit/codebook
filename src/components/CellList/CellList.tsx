import { FC } from "react";
import { useAppSelector } from "../../hooks/use-typed-selector";
import CellListItem from "./CellListItem/CellListItem";
const CellList: FC = () => {
  const cellState = useAppSelector((state) => state.cells);
  const cells = cellState.order.map((id) => cellState.data[id]);

  const renderedCells = cells.map((cell) => (
    <CellListItem key={cell.id} cell={cell} />
  ));
  return <ul>{renderedCells}</ul>;
};

export default CellList;
