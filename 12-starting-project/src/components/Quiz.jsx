import {useState, useCallback} from "react";
import QUESTIONS from "../questions.js";
import completeImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import Question from "./Question.jsx";

export default function Quiz() {

    const [answerState, setAnswerState] = useState('');
    // 사용자가 선택한 답을 등록하기 위해 관리
    const [userAnswers, setUserAnswers] = useState([]);
    // 사용자가 선택한 답을 저장한 길이의 배열만큼의 인덱스를 저장하면 해당하는 질문 인덱스와 동일해진다.
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    // 이 함수는 원래 컴포넌트 단에서 생성된 함수로 컴포넌트 상태에 의존되어 재생성된다. 그러니 전달한 컴포넌트도 이에 대해 영향을 받아 재평가 되면서 useEffect로 처리해도 새로운 함수로 판단하여 timeout이 재생성되었다. 이를 해결햐기 위해 useCallback을 사용.
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {

        // 답변을 선택했다는 상태를 저장.
        setAnswerState('answerd');

        // 이전에 유저가 선택한 답안을 유지하면서 업데이트
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });

        // 1초뒤 정답과 선택된 답안을 비교하여 정답 여부를 업데이트
        setTimeout(() => {
            if(QUESTIONS[activeQuestionIndex].answers[0] === selectedAnswer) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setAnswerState('');
            }, 2000)
        },1000);
    }, [activeQuestionIndex]);      // activeQuestionIndex를 사용하고 activeQuestionIndex가 업데이트 될때마다 재생성되어야 하니 의존성 배열에 추가

    // 위와 똑같이 useCallback을 사용해 의존성으로 handleSelectAnswer로 설정하여 상수에 저장하여 하위 컴포넌트로 전달하였다.
    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if(quizIsComplete) {
        return (
        <div id="summary">
            <img src={completeImg} alt="Trophy Icon"/>
            <h2>Quiz Completed!</h2>
        </div>
    )}

    return (
        <div id="quiz">
            <Question key={activeQuestionIndex} questionText={QUESTIONS[activeQuestionIndex].text} answers={QUESTIONS[activeQuestionIndex].answers} onSelectAnswer={handleSelectAnswer} selectedAnswer={userAnswers[userAnswers.length - 1]} answerState={answerState} onSkipAnswer={handleSkipAnswer}/>
        </div>
    );
}