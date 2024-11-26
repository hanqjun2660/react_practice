import {useEffect, useState} from "react";
import ProgressBar from "./ProgressBar.jsx";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
    useEffect(() => {
        console.log('TIMER SET');
        const timer = setTimeout(() => {
            onConfirm();
        }, TIMER);

        return () => {
            console.log('Clear timer');
            clearTimeout(timer);
        }
        // onConfirm 함수는 APP 컴포넌트에 존재한다. App 컴포넌트의 상태가 변경되어 재로딩되면 그 컴포넌트 내 함수는 재생성된다. 고로 여기서 의존성으로 설정하면 무한루프의 위험이 있다.
        // 하지만 현재 어플리케이션에서는 Modal 컴포넌트에서 open props를 이용해 조건적으로 컴포넌트를 삭제하므로 무한루프에 빠지지는 않는다.
    }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
        <ProgressBar timer={TIMER}/>
    </div>
  );
}
