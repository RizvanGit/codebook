import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootReducerState, AppDispatch } from "../state";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootReducerState> = useSelector;
