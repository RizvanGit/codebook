import { ActionType } from "../action-types";
import { ActionUnion } from "../actions";
import { ICell } from "../cell-type";

interface ICellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: ICell;
  };
}

const initialState: ICellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = (
  state: ICellState = initialState,
  action: ActionUnion
): ICellState => {
  switch (action.type) {
    case ActionType.MOVE_CELL:
      return state;
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            content,
          },
        },
      };
    case ActionType.INSERT_CELL_BEFORE:
      return state;
    case ActionType.DELETE_CELL:
      return state;
    default:
      return state;
  }
};

export default reducer;
