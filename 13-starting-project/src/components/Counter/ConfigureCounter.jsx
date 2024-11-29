import {useState} from "react";
import {log} from '../../log.js';

export default function ConfigureCounter({onSet}) {
    /**
     * App 컴포넌트에서 아래 상태를 관리하고 있어 컴포넌트를 분리하여 상태를 해당 컴포넌트에서만 사용하게 변경하여
     * 불필요한 컴포넌트의 재실행을 방지함.
     */
    log('<ConfigureCounter />', 1);

    const [enteredNumber, setEnteredNumber] = useState(0);

    function handleChange(event) {
        setEnteredNumber(+event.target.value);
    }

    function handleSetClick() {
        onSet(enteredNumber);
        setEnteredNumber(0);
    }

    return(
        <section id="configure-counter">
            <h2>Set Counter</h2>
            <input type="number" onChange={handleChange} value={enteredNumber} />
            <button onClick={handleSetClick}>Set</button>
        </section>
    );
}