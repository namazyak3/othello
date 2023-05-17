import { NextPage } from "next"
import styles from "./table.module.scss"
import _tableData from "./init.json"
import { useState } from "react"
import Stone from "./stone"
import { lstat } from "fs"

const Table: NextPage = () => {
  // false => 1, true => 2
  const [turn, setTurn] = useState<1|2>(1)
  const toggleTurn = () => setTurn(turn == 1 ? 2 : 1)
  const [tableData, setTableData] = useState<number[][]>(_tableData)

  const setStone = (row: number, column: number) => {
    tableData[row][column] = turn
    toggleTurn()

    const getList = (type: "row"|"col"|"dia") => {
      if (type=="row") {
        return tableData[row]
      }
      else if (type=="col") {
        let ls: number[] = []
        for (let i = 0; i < 3; i++) {
          ls.push(tableData[i][column])
        }
        return ls
      }
      else {
        if (row == 0) {
          if (column == 0) {
            
          }
        } else if (row == 2) {
          return [tableData[0][2], tableData[1][1], tableData[2][0]]
        }
      }
    }
    console.log(getList("row"))
    console.log(getList("col"))
  }
 
  return (
    <>
    <table className={styles.table}>
      <tbody>
        {Object.keys(tableData).map((key, i) => (
          <tr key={key}>
            {Object.keys(tableData[i]).map((key, ii) => (
              <td key={key}><Stone side={tableData[i][ii]} handler={() => setStone(i, ii)} /></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

export default Table