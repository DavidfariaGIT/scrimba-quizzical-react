import Header from "./components/Header.jsx"
import Quiz from "./components/Quiz.jsx"
import { useEffect, useState } from "react"


function App() {
const [gameStart, setGameStart] = useState(false)

 function startGame() {
  setGameStart(true)
}

  return (
    <> 
      { gameStart ? <Quiz /> : <Header gameStarted={startGame}/>}
    </>
  )
}

export default App
