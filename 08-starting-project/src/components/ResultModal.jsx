import { forwardRef, useImperativeHandle, useRef } from 'react';     // forwardRef -> 다른 컴포넌트의 참조를 전달 받아 사용하고 싶을때 사용
import { createPortal } from 'react-dom';       // 컴포넌트에 그려질 dom의 위치를 변경할 수 있다.

// forwardRef 함수로 감싼다.
const ResultModal = forwardRef(function ResultModal({remainingTime, targetTime, onReset}, ref) {        // 두번째 인자로 받아야함
    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);       // 소수점 두자리까지만 나오게
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {        // useImperativeHandle를 사용하려면 forwardRef와 함꼐 사용
        return {
            open() {
                dialog.current.showModal();
            }
        };
    });

    return createPortal(        // 첫번재 인수의 dom을 두번째 인수의 dom으로 이동시킴
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {userLost && <h2>You lost</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
})

// 컴포넌트 함수 선언부에 export default를 사용하지 않고 하단에 따로 내보내자.
export default ResultModal;