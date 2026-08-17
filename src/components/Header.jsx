export default function Header(props) {

    return (
      <header>
      <div className="intro-container">
      <h1>Quizzical</h1>
      <p>Trivia quiz based off random topics</p>
      <button onClick={() => props.gameStarted()} className="new-game-btn">Start quiz</button>
      </div>
      <div className="background-blob-one"><img src="src/assets/yellow-blob.png"/></div> 
      <div className="background-blob-two"><img src="src/assets/blue-blob.png"/></div>
      </header>
    )
}