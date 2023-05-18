import { NextPage } from "next"
import styles from "./log-view.module.scss"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const LogView: NextPage = () => {
  const log = useSelector((state: RootState) => state.logs.log)

  return (
    <div className={styles.logView}>
      <ol>
        {Object.keys(log).map((key, i) => (
        <li key={key}>行: {log[i].row+1}, 列: {log[i].column+1}</li>
        ))}
      </ol>
    </div>
  )
}

export default LogView