import { useEffect, useState } from "react";

export default function main(props) {
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => setQuizData(data.results));
  }, []);

  console.log(quizData);

  return (
    <main className="main-container">
    <form>
      {quizData.map((question, index) => {
        console.log(question);
        const answersArray = [];
        answersArray.push(...question.incorrect_answers);
        answersArray.push(question.correct_answer);

        const answerButtons = answersArray.map((curr, i) => (
          <div key={curr}>
            <input id={curr} type="radio" name={curr} value={curr} />
            <label className="answer-btn" htmlFor={curr}>
              {curr}
            </label>
          </div>
        ));

        return (
            <div className="question-wrapper">
            <h2>{question.question}</h2>
            <div className="answers-list">{answerButtons}</div>
            </div>
        );
      })}
    <button className="submit-button" type="submit">Check answers</button>
      </form>
      <div className="background-blob-one bg-blob-main">
        <img src="src/assets/yellow-blob.png" />
      </div>
      <div className="background-blob-two bg-blob-main">
        <img src="src/assets/blue-blob.png" />
      </div>
    </main>
  );
}
