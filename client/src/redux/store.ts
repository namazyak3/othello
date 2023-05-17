import { configureStore } from "@reduxjs/toolkit";
import turnReducer from "./slice/turn";

export const store = configureStore({
  reducer : {
    turns: turnReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch