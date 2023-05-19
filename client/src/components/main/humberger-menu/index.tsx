import { NextPage } from "next"
import styles from "./humberger-menu.module.scss"
import LogView from "./log-view"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const HumbergerMenu: NextPage = () => {
  const dispatch = useDispatch()

  const putList = useSelector((state: RootState) => state.putList.putList)

  return (
    <>
    <div className={styles.humbergerMenu}>
      <LogView />
      <ul>
        {Object.keys(putList).map((key, i) => (
          <li key={key}>行: {putList[i].row+1}, 列: {putList[i].column+1}</li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default HumbergerMenu