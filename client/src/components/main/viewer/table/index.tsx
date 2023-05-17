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
      `置いた: {行列: ${row},列: ${column}, ターン: ${turn == 1 ? "白" : "黒"}}`
    );

    // row
    console.log("行", tableData[row]);

    // column
    console.log(
      "列",
      Object.keys(tableData).map((key, i) => tableData[i][column])
    );

    // diaglam
    //console.log(`上: ${row}, 右: ${7 - column}, 下: ${7 - row}, 左: ${column}`);
    const r_u = Math.min(7 - column, row);
    const r_d = Math.min(7 - column, 7 - row);
    const l_d = Math.min(column, 7 - row);
    const l_u = Math.min(column, row);

    // diaglam(ld > ru)
    const ld_ru = [...Array(r_u + l_d + 1)].map((key, ii) => {
      return 1;
    });
    console.log("左下 > 右上", ld_ru);

    // diaglam(rr > ld)
    const ru_ld = [...Array(r_d + l_u + 1)].map((key, ii) => {
      return 1;
    });
    console.log("右上 > 左下", ru_ld);
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
