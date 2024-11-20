import { useState, useRef } from "react";

export default function Player() {
    const playerName = useRef();

    const [enteredPlayerName, setEnteredPlayerName] = useState(null);

    function handleClick() {
        setEnteredPlayerName(playerName.current.value);  // Ref를 사용할때 current 속성 먼저 접근해야함.
    }

    return (
        <section id="player">
          <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
          <p>
            <input ref={playerName} type="text"/>
            <button onClick={handleClick}>Set Name</button>
          </p>
        </section>
    );
}
