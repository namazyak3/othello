import { NextPage } from "next";
import styles from "./table.module.scss";
import _tableData from "./init.json";
import { useState } from "react";
import Stone from "../stone";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleTurn } from "@/redux/slice/turn";
import { addLog } from "@/redux/slice/log";

const Table: NextPage = () => {
  //- 変数宣言
  //* ボード(初期値は"./init.json"を参照)
  const [board, setBoard] = useState<number[][]>(_tableData);

  //* ターン: 1 or -1
  const turn = useSelector((state: RootState) => state.turns.turn)

  //* redux関数
  const dispatch = useDispatch()

  //- 
  const putStone = (row: number, column: number) => {
    //- ボードのコピー
    const newBoard = [...board]

    //- 選択位置からボードのある面までの相対距離
    const u = row
    const d = 7 - row
    const r = 7 -column
    const l = column
    const r_u = Math.min(7 - column, row);
    const r_d = Math.min(7 - column, 7 - row);
    const l_d = Math.min(column, 7 - row);
    const l_u = Math.min(column, row);

    //- 選択位置から4方向(縦, 横, 斜め2方向)の配列
    // 左 > 右
    const l_r = board[row]

    // 上 > 下
    const u_d = Object.keys(board).map((key, i) => board[i][column])

    // 右上 > 左下
    const ru_ld = [...Array(l_d + r_u + 1)].map((key, i) => board[i + (u <= r ? 0 : u - r)][7 - i - (u < r ? r - u : 0)]);

    // 左上 > 右下
    const lu_rd = [...Array(l_u + r_d + 1)].map((key, i) => board[i + (u <= l ? 0 : u - l)][i + (u < l ? l - u : 0)]);

    //- 有効な位置であるかチェック & 有効であれば配列を返す
    const reverseCheck = (list: number[], left: number, right: number) => {
      //* 選択位置からの分割
      // 左分割
      const l_ls = list.slice(0, left).reverse()
      const lio_t = l_ls.indexOf(turn)
      const lio_nt = l_ls.indexOf(turn == 1 ? -1 : 1)
      const lio_0 = l_ls.indexOf(0)

      // 右分割
      const r_ls = right != 0 ? list.slice(-right) : []
      const rio_t = r_ls.indexOf(turn)
      const rio_nt = r_ls.indexOf(turn == 1 ? -1 : 1)
      const rio_0 = r_ls.indexOf(0)

      //* 置き換え条件に合致した場所をひっくり返す
      // ひっくり返したかどうか
      let ok = false

      // 左配列
      if (lio_t != -1 && lio_t != 0 && (lio_0 == -1 || lio_t < lio_0) && lio_t > lio_nt) {
        l_ls.splice(0, lio_t, ...[...Array(lio_t)].map(() => turn))
        ok = true
      }

      // 右配列
      if (rio_t != -1 && rio_t != 0 && (rio_0 == -1 || rio_t < rio_0) && rio_t > rio_nt) {
        r_ls.splice(0, rio_t, ...[...Array(rio_t)].map(() => turn))
        ok = true
      }

      //* 返り値
      return {

        // 返したかどうか
        res: ok,

        // 変更適用後の配列
        data: [...l_ls.reverse(), ok ? turn : 0, ...r_ls]
      }
    }

    //- 選択場所から4方向の配列を取得
    // 上 > 下
    Object.keys(reverseCheck(u_d, u, d).data).map((key, i) => newBoard[i][column] = reverseCheck(u_d, u, d).data[i])

    // 左 > 右
    newBoard[row] = reverseCheck(l_r, l, r).data
    
    // 右上 > 左下
    Object.keys(reverseCheck(ru_ld, r_u, l_d).data).map((key, i) => {
      newBoard[i + (u <= r ? 0 : u - r)][7 - i - (u < r ? r - u : 0)] = reverseCheck(ru_ld, r_u, l_d).data[i]
    })

    // 左上 > 右下
    Object.keys(reverseCheck(lu_rd, l_u, r_d).data).map((key, i) => {
      newBoard[i + (u <= l ? 0 : u - l)][i + (u < l ? l - u : 0)] = reverseCheck(lu_rd, l_u, r_d).data[i]}
    )

    //- ターン切り替えの判定
    //* どこか一つでも返されていたら処理を行う
    if (reverseCheck(l_r, l, r).res || reverseCheck(u_d, u, d).res || reverseCheck(ru_ld, r_u, l_d).res || reverseCheck(lu_rd, l_u, r_d).res) {
      
      //* ターンの切り替え
      dispatch(toggleTurn())

      //* ログの追加
      dispatch(addLog({row, column}))

      //* 変更点の確定
      // 選択位置に自分の石を置く
      newBoard[row][column] = turn

      // 変更点をボードに反映
      setBoard(newBoard)
    }
  };

  return (
    <>
      <table className={styles.table}>
        <tbody>
          {Object.keys(board).map((key, i) => (
            <tr key={key}>
              {Object.keys(board[i]).map((key, ii) => (
                <td key={key}>
                  <Stone
                    side={board[i][ii]}
                    handler={() => putStone(i, ii)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
