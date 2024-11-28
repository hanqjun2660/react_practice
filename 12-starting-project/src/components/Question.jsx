import Answers from "./Answers.jsx";
import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from "../questions.js";

export default function Question({questionText, answers, onSelectAnswer, selectedAnswer, answerState, onSkipAnswer}) {
    return (
        <div id="question">
            <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
            <h2>{questionText}</h2>
            <Answers answers={answers} selectedAnswer={selectedAnswer} answerState={answerState} onSelect={onSelectAnswer}/>
        </div>
    );
}