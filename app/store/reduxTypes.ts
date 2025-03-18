import { AnyAction, Reducer } from "redux";
import { ThunkDispatch } from "redux-thunk";
import DjangoService from "./services/DjangoService";
import { DjangoStateType } from "./reducers/slices/djangoSlice";

export interface RootState {
  django: DjangoStateType;
  [DjangoService.reducerPath]: any;
}

export type RootDispatch = ThunkDispatch<RootState, void, AnyAction>;
export type RootReducer = Reducer<RootState, AnyAction>;
