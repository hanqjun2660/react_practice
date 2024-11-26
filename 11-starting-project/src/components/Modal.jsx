import {useEffect, useRef} from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if(open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);   // 의존성을 추가하면 의존성의 상태가 변화됨에 따라 Effect 함수가 다시 실행됨

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
