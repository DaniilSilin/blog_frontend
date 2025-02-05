import { TypedUseSelectorHook, useSelector } from "react-redux"
import { GetStaticPropsContext } from "next/types"
import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "./reducers/rootReducer"
import { RootState } from "./reduxTypes"
import DjangoService from './services/DjangoService'

let store: any

const createStore = (
  preloadedState: Record<any, any>,
  context?: GetStaticPropsContext
) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: context,
        },
        serializableCheck: false,
      })
        .concat(DjangoService.middleware),
    devTools: process.env.NODE_ENV !== "production",
  })
}

export const initializeStore = (
  preloadedState: Record<any, any>,
  context: any = {}
) => {
  let _store = store ?? createStore(preloadedState, context)

  if (preloadedState && store) {
    const state = store.getState()
    _store = createStore(
      {
        ...preloadedState,
        user: state.user,
        app: state.app,
      },
      context
    )
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector