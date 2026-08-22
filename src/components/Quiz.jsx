import { useEffect, useState } from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";
import { clsx } from "clsx";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [guessedAnswers, setGuessedAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        const formattedQuestions = data.results.map((item) => {
          const allAnswers = [...item.incorrect_answers, item.correct_answer];
          allAnswers.sort(() => Math.random() - 0.5);

          return {
            id: nanoid(),
            question: decode(item.question),
            answers: allAnswers.map((answer) => ({
              id: nanoid(),
              value: decode(answer),
              isSelected: false,
            })),
            correct_answer: item.correct_answer,
          };
        });
        setQuestions(formattedQuestions);
      });
  }, []);

  const handleClick = (value, answer) => {
    setGuessedAnswers((preValues) => [...preValues, value]);
    answer.isSelected = true;
  };

  const checkAnswers = () => {
    setShowResults(true);

    const correctAnswersArray = [];
    const correctAnswers = questions.map((correct_answer) => {
      correctAnswersArray.push(correct_answer.correct_answer);
    });

    const wrongGuessScoreArray = guessedAnswers.filter(
      (ans) => !correctAnswersArray.includes(ans),
    );
    const wrongGuesses = wrongGuessScoreArray.length;
    setWrongAnswers(wrongGuesses);
  };

  const isGameOver = guessedAnswers.length === 5;

  const questionsText = questions.map((ques, index) => (
    <div className="question-block" key={index}>
      <h2 key={ques.question}>{ques.question}</h2>
      <div className="answer-wrapper">
        {ques.answers.map((answer, index) => (
          <label
            className={clsx("custom-button", {
              selectedguess: answer.isSelected && !showResults,
              correctguess: showResults && answer.value === ques.correct_answer,
              wrongguess:
                showResults &&
                answer.isSelected &&
                answer.value !== ques.correct_answer,
            })}
            key={index}
            htmlFor={`${ques.id}-${answer.id}`}
          >
            {answer.value}
            <input
              key={answer.id}
              className="hidden-input"
              type="radio"
              value={answer.value}
              id={`${ques.id}-${answer.id}`}
              name={ques.id}
              onClick={() => handleClick(answer.value, answer)}
            />
          </label>
        ))}
      </div>
    </div>
  ));

  return (
    <main>
      <section className="question-container">
        <div className="questions-wrapper">{questionsText}</div>
      </section>
      {isGameOver ? (
        <button onClick={checkAnswers} className="checkanswers-btn">
          Check answers
        </button>
      ) : null}
      {isGameOver && wrongAnswers !== 0 ? (
        <p className="score-msg">{`you got ${5 - wrongAnswers}/5 Correct!`}</p>
      ) : null}
      <div className="background-blob-one bg-blob-main">
        <img src="src/assets/yellow-blob.png" />
      </div>
      <div className="background-blob-two bg-blob-main">
        <img src="src/assets/blue-blob.png" />
      </div>
    </main>
  );
}
