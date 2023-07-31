import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootReducerState } from "../state";

export const useAppSelector: TypedUseSelectorHook<RootReducerState> = useSelector;
