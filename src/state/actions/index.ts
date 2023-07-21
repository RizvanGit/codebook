import { CellTypes } from "../cell-type";

export type DirectionType = "up" | "down";

export interface IMoveCell {
  id: string;
  direction: DirectionType;
}

export type IDeleteCell = string;

export interface IInsertCellBefore {
  id: string;
  type: CellTypes;
}

export interface IUpdateCell {
  id: string;
  content: string;
}

export type ActionUnion =
  | IMoveCell
  | IDeleteCell
  | IInsertCellBefore
  | IUpdateCell;
