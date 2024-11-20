import { forwardRef, useImperativeHandle, useRef } from 'react';     // forwardRef -> 다른 컴포넌트의 참조를 전달 받아 사용하고 싶을때 사용

// forwardRef 함수로 감싼다.
const ResultModal = forwardRef(function ResultModal({result, targetTime}, ref) {        // 두번째 인자로 받아야함
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        };
    });

    return(
        <dialog ref={dialog} className="result-modal">
            <h2>You {result}</h2>
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>X seconds left.</strong></p>
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>
    );
})

// 컴포넌트 함수 선언부에 export default를 사용하지 않고 하단에 따로 내보내자.
export default ResultModal;