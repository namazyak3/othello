import { NextPage } from "next";
import styles from "./table.module.scss";
import _tableData from "./init.json";
import { useState } from "react";
import Stone from "./stone";

const Table: NextPage = () => {
  //* -1: 黒, 1: 白
  const [turn, setTurn] = useState<1 | -1>(1);
  const toggleTurn = () => setTurn(turn == 1 ? -1 : 1);
  const [tableData, setTableData] = useState<number[][]>(_tableData);

  const setStone = (row: number, column: number) => {
    //tableData[row][column] = turn;
    toggleTurn();

    console.log(
      `置いた: {行: ${row},列: ${column}, ターン: ${turn == 1 ? "白" : "黒"}}`
    );

    // row
    console.log("行", tableData[row]);

    // column
    console.log(
      "列",
      Object.keys(tableData).map((key, i) => tableData[i][column])
    );

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

    // diaglam(ld > ru)
    const ld_ru = [...Array(l_d + r_u + 1)].map((key, i) => tableData[i + (u <= r ? 0 : u - r)][7 - i - (u < r ? r - u : 0)]);
    console.log("左下 > 右上", ld_ru)

    //diaglam(lu > rd)
    const lu_rd = [...Array(l_u + r_d + 1)].map((key, i) => tableData[i + (u <= l ? 0 : u - l)][i + (u < l ? l - u : 0)]);
    console.log("左上 > 右下", lu_rd)
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
                    handler={() => setStone(i, ii)}
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
