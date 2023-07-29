import { CellTypes, ICell } from "../cell-type";

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

export interface IInsertCellAfter {
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
  | IInsertCellAfter
  | IUpdateCell;

export interface IBundleStart {
  cellId: string;
}

export interface IBundle {
  cellId: string;
  bundle: {
    code: string;
    error: string;
  };
}

export type FetchResponseType = { data: ICell[]; error: string };
