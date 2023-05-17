import { NextPage } from "next"
import styles from "./info.module.scss"
import Stone from "../stone"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const Info: NextPage = () => {
  const turn = useSelector((state: RootState) => state.turns.turn)

  return (
    <>
    <div className={styles.info}>
      <div className={styles.turn_view}>
        <Stone side={turn} handler={() => {}} />
      </div>
    </div>
    </>
  )
}

export default Info