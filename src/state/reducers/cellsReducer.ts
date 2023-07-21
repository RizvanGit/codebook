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
  return state;
};

export default reducer;
