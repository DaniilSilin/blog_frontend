import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import { RootReducer } from "../reduxTypes";
import DjangoService from "../services/DjangoService";
import djangoSlice from "./slices/djangoSlice";
// @ts-ignore
export const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
        django: state?.django ?? action.payload.django,
      };
    default: {
      const combineReducer = combineReducers({
        django: djangoSlice,
        [DjangoService.reducerPath]: DjangoService.reducer,
      });
      return combineReducer(state, action);
    }
  }
};
