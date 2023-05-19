import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  sign: Boolean
  stoneList: {
    row: number
    column: number
  }[]
  putList: {
    row: number
    column: number
  }[]
}

const initialState: InitialState = {
  sign: false,
  stoneList: [],
  putList: []
}

export const putListSlice = createSlice({
  name: "putList",
  initialState,
  reducers: {
    checkStoneList: (state) => {
      state.sign = !state.sign
    },

    addStoneList: (state, action) => {
      if (state.stoneList.indexOf(action.payload) == -1) {
        state.stoneList.push(action.payload)

        const serchPutPoint = [
          [0, -1],  // 上
          [1, -1],  // 右上
          [1, 0],  // 右
          [1, 1],  // 右下
          [0, 1],  // 下
          [-1, 1],  // 左下
          [-1, 0],  // 左
          [-1, -1]  // 左上
        ]

        Object.keys(serchPutPoint).map((key, i) => {
          const xpoint: number = action.payload.row - serchPutPoint[i][0]
          const ypoint: number = action.payload.row - serchPutPoint[i][1]

          if (xpoint <= 7 && xpoint >= 0 && ypoint <= 7 && ypoint >= 0) {
            if (!state.putList.some(ls => ls.row == xpoint && ls.column == ypoint)) {
              state.putList.push({row: xpoint, column: ypoint})
            }
          }
        })
      }
    },

    clearStoneList: (state) => {
      state.stoneList = []
    },
  }
})

export const { checkStoneList, addStoneList, clearStoneList } = putListSlice.actions;
export default putListSlice.reducer;