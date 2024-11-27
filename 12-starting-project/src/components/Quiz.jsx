import {useState} from "react";
import QUESTIONS from "../questions.js";

export default function Quiz() {
    // 사용자가 선택한 답을 등록하기 위해 관리
    const [userAnswers, setUserAnswers] = useState([]);
    // 사용자가 선택한 답을 저장한 길이의 배열만큼의 인덱스를 저장하면 해당하는 질문 인덱스와 동일해진다.
    const activeQuestionIndex = userAnswers.length;

    function handleSelectAnswer(selectedAnswer) {
        // 이전에 유저가 선택한 답안을 유지하면서 업데이트
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }

    return (
        <div id="quiz">
            <div id="question">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {QUESTIONS[activeQuestionIndex].answers.map(answer => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}