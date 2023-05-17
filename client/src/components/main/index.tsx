import { NextPage } from "next"
import styles from "./main.module.scss"
import Viewer from "./viewer"

const Main: NextPage = () => {
  return (
    <>
    <div className={styles.main}>
      <Viewer />
    </div>
    </>
  )
}

export default Main