import { NextPage } from "next"
import styles from "./viewer.module.scss"
import Table from "./table"
import Info from "./info"

const Viewer: NextPage = () => {
  return (
    <>
    <div className={styles.viewer}>
      <Table />
      <Info />
    </div>
    </>
  )
}

export default Viewer