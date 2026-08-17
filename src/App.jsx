import Header from "./components/Header.jsx"
import { useState } from "react"


function App() {
let [gameStart, setGameStart] = useState(false)

function startGame() {
  setGameStart(true)

}

  return (
    <> 
      { gameStart ? <h1>Game has started</h1> : <Header gameStarted={startGame}/>}
    </>
  )
}

export default App
