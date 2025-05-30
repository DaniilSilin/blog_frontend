import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import DjangoService from "../../services/DjangoService";
import { RootState } from "../../reduxTypes";

export interface DjangoStateType {
  profile: Record<string, any>;
}

const appInitialState: DjangoStateType = {
  profile: {
    isGuest: true,
  },
};

const djangoSlice = createSlice({
  name: "django",
  initialState: appInitialState,
  reducers: {
    logout: (state) => {
      state.profile = appInitialState.profile;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        HYDRATE,
        (
          state,
          action: {
            type: "__NEXT_REDUX_WRAPPER_HYDRATE__";
            payload: RootState;
          },
        ) => {
          return {
            ...state,
          };
        },
      )
      .addMatcher(
        DjangoService.endpoints.getUserData.matchFulfilled,
        (state, { payload }) => {
          state.profile = {
            ...state.profile,
            ...payload,
            isGuest: false,
          };
        },
      );
  },
});

export const AllActions = djangoSlice.actions;

export const { logout } = AllActions;

export default djangoSlice.reducer;
