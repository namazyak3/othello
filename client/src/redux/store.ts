import { configureStore } from "@reduxjs/toolkit";
import turnReducer from "./slice/turn";
import putListReducer from "./slice/putList"
import logReducer from "./slice/log"

export const store = configureStore({
  reducer : {
    turns: turnReducer,
    putList: putListReducer,
    logs: logReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch