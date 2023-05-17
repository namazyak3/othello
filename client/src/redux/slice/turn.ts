import { createSlice } from "@reduxjs/toolkit";

const initialState: {turn: -1|1} = {
  turn: 1
}

export const turnSlice = createSlice({
  name: "turn",
  initialState,
  reducers: {
    toggleTurn: (state) => {
      state.turn = state.turn == 1 ? -1 : 1
    }
  }
})

export const { toggleTurn } = turnSlice.actions;
export default turnSlice.reducer;