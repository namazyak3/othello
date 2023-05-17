import { NextPage } from "next"
import styles from "./stone.module.scss"

const Stone: NextPage<{side: number, handler: any}> = ({ side, handler }) => {
  return (
    <>
    <div className={styles.stoneBox}>
      {side == 0 ? (
      <button className={styles.button} onClick={() => handler()} />
      ) : (
      <div className={styles.stone} style={{backgroundColor: side == 1 ? "white" : "black"}} />
      )}
    </div>
    </>
  )
}

export default Stone