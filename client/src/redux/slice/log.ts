import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  log: {
    row: number
    column: number
  }[]
}

const initialState: InitialState = {
  log: []
}

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    addLog: (state, action) => {
      state.log.push(action.payload)
    }
  }
})

export const { addLog } = logSlice.actions;
export default logSlice.reducer;