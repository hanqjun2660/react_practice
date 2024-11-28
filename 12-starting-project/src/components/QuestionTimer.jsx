import {useEffect, useState} from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        console.log('SETTING TIMEOUT');
        const timer = setTimeout(onTimeout, timeout);
        return () => {
            clearTimeout(timer);
        };
    }, [onTimeout, timeout]);       // 상위 컴포넌트에서 전달받은 onTimeout이 컴포넌트 상태에 따라 재설정되어 여기서도 영향을 받아 해당 useEffect가 영향을 받았었지만 상위에서 useCallback으로 해결하였다.

    // Strict Mdoe로 인해 현재 Effect 함수가 두번 실행됨. 설정한 시간보다 빨리 사라짐. 문제를 해결하기위해서 cleanup이 필요함.
    useEffect(() => {
        console.log('SETTING INTERVAL');
        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
        }, 100);

        return () => {
            clearInterval(interval);    // cleanup
        };
    }, []);

    return (
        <progress id="question-time" value={remainingTime} max={timeout}/>
    );
}