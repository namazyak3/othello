import { NextPage } from "next"

const Home: NextPage = () => {
  return (
    <>
    <form>
      <input type="text" name="name" />
      <input type="submit" value="送信" />
    </form>
    </>
  )
}

export default Home