import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import DjangoService from "../../services/DjangoService"
import { RootState } from "../../reduxTypes"

export interface DjangoStateType {

}

const appInitialState: DjangoStateType = {

}

const djangoSlice = createSlice({
  name: "django",
  initialState: appInitialState,
  reducers: {
    startFetching: state => {
      state.isFetching = true
    },
    triggerFrontendParamsChange: state => {
      state.paramsWasChangedOnce = true
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        HYDRATE,
        (
          state,
          action: { type: "__NEXT_REDUX_WRAPPER_HYDRATE__"; payload: RootState }
        ) => {
          return {
            ...state,
          }
        }
      )
  },
})

export default djangoSlice.reducer