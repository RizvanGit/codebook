import { ActionType } from "../action-types";
import {
  ActionUnion,
  DirectionType,
  IDeleteCell,
  IInsertCellBefore,
  IMoveCell,
  IUpdateCell,
} from "../actions";
import { CellTypes } from "../cell-type";

export const updateCell = (id: string, content: string): IUpdateCell => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): IDeleteCell => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: DirectionType): IMoveCell => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellBefore = (
  id: string,
  cellType: CellTypes
): IInsertCellBefore => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      type: cellType,
    },
  };
};
