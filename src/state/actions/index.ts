import { ActionType } from "../action-types";
import { CellTypes } from "../cell-type";

export type DirectionType = "up" | "down";

export interface IMoveCell {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: DirectionType;
  };
}

export interface IDeleteCell {
  type: ActionType.DELETE_CELL;
  payload: string;
}

export interface IInsertCellBefore {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string;
    type: CellTypes;
  };
}

export interface IUpdateCell {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export type ActionUnion =
  | IMoveCell
  | IDeleteCell
  | IInsertCellBefore
  | IUpdateCell;
