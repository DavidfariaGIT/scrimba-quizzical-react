import { useEffect, useState } from "react"

export default function main(props) {
    const [quizData, setQuizData] = useState([])

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
        .then(res => res.json())
        .then(data => setQuizData(data.results))
    }, [])

    console.log(quizData)

    const questionAnswers = quizData.map((answer) => {
        const answersArray = []
        answersArray.push(...answer.incorrect_answers)
        answersArray.push(answer.correct_answer)

        console.log(answersArray)

        return (
            <input key={answer.question} type="radio" value={answersArray}/>
        )
    })
    

    return(
        <main>   
            {quizData.map((question, index) => {
                return (
                <div key={question.question}>
                <p>{question.question}</p>
                {questionAnswers}
                </div>
                )
            })}
            <div className="background-blob-one bg-blob-main"><img src="src/assets/yellow-blob.png"/></div> 
            <div className="background-blob-two bg-blob-main"><img src="src/assets/blue-blob.png"/></div>
        </main>
     
     )
}
