import {useEffect, useState} from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        console.log('SETTING TIMEOUT');
        setTimeout(onTimeout, timeout);
    }, [onTimeout, timeout]);       // 상위 컴포넌트에서 전달받은 onTimeout이 컴포넌트 상태에 따라 재설정되어 여기서도 영향을 받아 해당 useEffect가 영향을 받았었지만 상위에서 useCallback으로 해결하였다.

    useEffect(() => {
        console.log('SETTING INTERVAL');
        setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
        }, 100);
    }, []);

    return (
        <progress id="question-time" value={remainingTime} max={timeout}/>
    );
}