import {useState, useCallback} from "react";
import QUESTIONS from "../questions.js";
import completeImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
    // 사용자가 선택한 답을 등록하기 위해 관리
    const [userAnswers, setUserAnswers] = useState([]);
    // 사용자가 선택한 답을 저장한 길이의 배열만큼의 인덱스를 저장하면 해당하는 질문 인덱스와 동일해진다.
    const activeQuestionIndex = userAnswers.length;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    function shuffle(answers) {
        for(let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        return answers;
    }

    // 이 함수는 원래 컴포넌트 단에서 생성된 함수로 컴포넌트 상태에 의존되어 재생성된다. 그러니 전달한 컴포넌트도 이에 대해 영향을 받아 재평가 되면서 useEffect로 처리해도 새로운 함수로 판단하여 timeout이 재생성되었다. 이를 해결햐기 위해 useCallback을 사용.
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        // 이전에 유저가 선택한 답안을 유지하면서 업데이트
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }, []);

    // 위와 똑같이 useCallback을 사용해 의존성으로 handleSelectAnswer로 설정하여 상수에 저장하여 하위 컴포넌트로 전달하였다.
    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if(quizIsComplete) {
        return (
        <div id="summary">
            <img src={completeImg} alt="Trophy Icon"/>
            <h2>Quiz Completed!</h2>
        </div>
    )}

    const shuffledAnswers = shuffle([...QUESTIONS[activeQuestionIndex].answers]);

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer}/>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map(answer => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}