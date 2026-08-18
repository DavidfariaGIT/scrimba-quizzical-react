import Header from "./components/Header.jsx"
import Main from "./components/Main.jsx"
import { useEffect, useState } from "react"


function App() {
const [gameStart, setGameStart] = useState(false)

 function startGame() {
  setGameStart(true)
}

  return (
    <> 
      { gameStart ? <Main /> : <Header gameStarted={startGame}/>}
    </>
  )
}

export default App
