import { CellTypes } from "../cell-type";

export enum DIRECTIONS {
  UP = "up",
  DOWN = "down",
}
export type DirectionType = DIRECTIONS;

export interface IMoveCell {
  id: string;
  direction: DirectionType;
}

export type IDeleteCell = string;

export interface IInsertCellBefore {
  id: string | null;
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
