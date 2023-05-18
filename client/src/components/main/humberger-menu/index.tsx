import { NextPage } from "next"
import styles from "./humberger-menu.module.scss"
import LogView from "./log-view"

const HumbergerMenu: NextPage = () => {
   return (
    <>
    <div className={styles.humbergerMenu}>
      <LogView />
    </div>
    </>
  )
}

export default HumbergerMenu