import { NextPage } from "next"
import styles from "./main.module.scss"
import Viewer from "./viewer"
import HumbergerMenu from "./humberger-menu"

const Main: NextPage = () => {
  return (
    <>
    <div className={styles.main}>
      <HumbergerMenu />
      <Viewer />
    </div>
    </>
  )
}

export default Main