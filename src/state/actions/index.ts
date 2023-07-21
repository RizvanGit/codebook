import { ActionType } from "../action-types";

interface IMoveCell {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: "up" | "down";
  };
}

interface IDeleteCell {
  type: ActionType.DELETE_CELL;
  payload: string;
}

interface IInsertCellBefore {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string;
    type: "code" | "text";
  };
}

interface IUpdateCell {
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
