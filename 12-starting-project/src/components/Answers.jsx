import {useRef} from "react";

export default function Answers({answers, selectedAnswer, answerState, onSelect}) {
    /**
     * userAnswer 상태 변경 추가에 따라 답변 선택시 suffle 함수가 재실행되는 문제가 발생.
     * useState, useEffect를 최소화 하기 위해 useRef 방식으로 수정 -> 참조 방식으로만 현재 컴포넌트에서 진행했을때 또 다른 문제 발생
     * 답변 목록이 1회만 섞이고 다음 문제에서부터 섞이지 않음. 해결을 위해 답변 컴포넌트로 분리 진행
     */
    const shuffledAnswers = useRef();

    function shuffle(answers) {
        for(let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        return answers;
    }

    // useRef 방식으로 변경되었으니 suffledAnswers 설정을 .current를 이용해 접근하여 설정
    if(!shuffledAnswers.current) {
        shuffledAnswers.current = shuffle([...answers]);
    }

    return (
        <ul id="answers">
            {shuffledAnswers.current.map(answer => {
                const isSelected = selectedAnswer === answer;
                let cssClass = '';

                if(answerState === 'answered' && isSelected) {
                    cssClass = 'selected';
                }

                if((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClass = answerState;
                }

                return(
                    <li key={answer} className="answer">
                        <button className={cssClass} onClick={() => onSelect(answer)} disabled={answerState !== ''}>{answer}</button>
                    </li>
                );
            })}
        </ul>
    );
}