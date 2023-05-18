import { NextPage } from "next";
import styles from "./table.module.scss";
import _tableData from "./init.json";
import { useState } from "react";
import Stone from "../stone";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleTurn } from "@/redux/slice/turn";

const Table: NextPage = () => {
  const dispatch = useDispatch()
  const turn = useSelector((state: RootState) => state.turns.turn)
  const [tableData, setTableData] = useState<number[][]>(_tableData);

  const checkStonePoint = (row: number, column: number) => {
    // console.log(
    //   `選択: {行: ${row+1},列: ${column+1}, ターン: ${turn == 1 ? "白" : "黒"}}`
    // );

    // row
    const l_r = tableData[row]
    //console.log("左 > 右", l_r);

    // column
    const u_d = Object.keys(tableData).map((key, i) => tableData[i][column])
    //console.log("上 > 下", u_d)

    // diaglam
    // 上: row, 下: 7 -row
    // 右: 7 - column, 左: column
    const u = row
    const d = 7 - row
    const r = 7 -column
    const l = column
    const r_u = Math.min(7 - column, row);
    const r_d = Math.min(7 - column, 7 - row);
    const l_d = Math.min(column, 7 - row);
    const l_u = Math.min(column, row);

    // diaglam(ru > ld)
    const ru_ld = [...Array(l_d + r_u + 1)].map((key, i) => tableData[i + (u <= r ? 0 : u - r)][7 - i - (u < r ? r - u : 0)]);
    //console.log("右上 > 左下", ru_ld)

    //diaglam(lu > rd)
    const lu_rd = [...Array(l_u + r_d + 1)].map((key, i) => tableData[i + (u <= l ? 0 : u - l)][i + (u < l ? l - u : 0)]);
    //console.log("左上 > 右下", lu_rd)

    const reverseCheck = (list: number[], left: number, right: number) => {
      // l
      const l_ls = list.slice(0, left).reverse()
      const lio_t = l_ls.indexOf(turn)
      const lio_nt = l_ls.indexOf(turn == 1 ? -1 : 1)
      const lio_0 = l_ls.indexOf(0)

      // r
      const r_ls = right != 0 ? list.slice(-right) : []
      const rio_t = r_ls.indexOf(turn)
      const rio_nt = r_ls.indexOf(turn == 1 ? -1 : 1)
      const rio_0 = r_ls.indexOf(0)

      // 置き換え
      if (lio_t < lio_0 && lio_t > lio_nt) {
        l_ls.splice(0, lio_t, ...[...Array(lio_t)].map(() => {return turn}))
      }
      if (rio_t < rio_0 && rio_t > rio_nt) {
        r_ls.splice(0, rio_t, ...[...Array(rio_t)].map(() => {return turn}))
      }

      const ok = (lio_nt != -1 && lio_t < lio_0 && lio_t > lio_nt) || (rio_nt != -1 && rio_t < rio_0 && rio_t > rio_nt)

      return {
        res: ok, 
        data: [...l_ls.reverse(), ok ? turn : 0, ...r_ls]
      }
    }

    // 上 > 下
    Object.keys(reverseCheck(u_d, u, d).data).map((key, i) => {
      //console.log(tableData[i][column], reverseCheck(u_d, u, d).data[i])
      tableData[i][column] = reverseCheck(u_d, u, d).data[i]
    })

    // 左 > 右
    tableData[row] = reverseCheck(l_r, l, r).data
    
    // 右上 > 左下
    Object.keys(reverseCheck(ru_ld, r_u, l_d).data).map((key, i) => tableData[i + (u <= r ? 0 : u - r)][7 - i - (u < r ? r - u : 0)] = reverseCheck(ru_ld, r_u, l_d).data[i])
    console.log(`右上 > 左下: ${reverseCheck(ru_ld, r_u, l_d).res ? "返す" : "返さない"}`)
    console.log(reverseCheck(ru_ld, r_u, l_d).data)

    // 左上 > 右下
    //Object.keys(tableData).map((key, i) => tableData[i + (u <= l ? 0 : u - l)][i + (u < l ? l - u : 0)] = reverseCheck(lu_rd, l_u, r_d).data[i])

    if (reverseCheck(l_r, l, r).res || reverseCheck(u_d, u, d).res) {
      dispatch(toggleTurn())
      tableData[row][column] = turn
    }
  };

  return (
    <>
      <table className={styles.table}>
        <tbody>
          {Object.keys(tableData).map((key, i) => (
            <tr key={key}>
              {Object.keys(tableData[i]).map((key, ii) => (
                <td key={key}>
                  <Stone
                    side={tableData[i][ii]}
                    handler={() => checkStonePoint(i, ii)}
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
