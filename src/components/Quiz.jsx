import { useEffect, useState } from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);

  const id = nanoid();

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        const formattedQuestions = data.results.map((item) => {
          const allAnswers = [...item.incorrect_answers, item.correct_answer];
          allAnswers.sort(() => Math.random() - 0.5);

          return {
            id: id,
            question: decode(item.question),
            answers: allAnswers.map((answer) => ({
              id: id,
              value: decode(answer),
              isSelected: false,
            })),
            correct_answer: item.correct_answer,
          };
        });
        setQuestions(formattedQuestions);
      });
  }, []);

  const questionsText = questions.map((ques, index) => (
    <div className="question-block" key={index}>
      <h2 key={ques.question}>{ques.question}</h2>
      <div className="answer-wrapper">
        {ques.answers.map((answer, index) => (
          <label className="custom-button" key={index} htmlFor={answer.id}>{answer.value}
          <input
            className="hidden-input"
            type="radio"
            value={answer.value}
            id={answer.id}
            name={ques.id}
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
      <div className="background-blob-one bg-blob-main">
        <img src="src/assets/yellow-blob.png" />
      </div>
      <div className="background-blob-two bg-blob-main">
        <img src="src/assets/blue-blob.png" />
      </div>
    </main>
  );
}
