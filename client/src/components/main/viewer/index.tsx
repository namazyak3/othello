import { NextPage } from "next"
import styles from "./viewer.module.scss"
import Table from "./table"

const Viewer: NextPage = () => {
  return (
    <>
    <div className={styles.viewer}>
      <Table />
    </div>
    </>
  )
}

export default Viewer