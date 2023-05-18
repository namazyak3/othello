import { configureStore } from "@reduxjs/toolkit";
import turnReducer from "./slice/turn";
import logReducer from "./slice/log"

export const store = configureStore({
  reducer : {
    turns: turnReducer,
    logs: logReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch