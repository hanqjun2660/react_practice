import { useState } from 'react';

export default function Player({initalName, symbol, isActive, onChangeName}) {

    const [ isEditing, setEditing ] = useState(false);
    const [ playerName, setPlayerName ] = useState(initalName);

    function handleEditClick() {
        setEditing((editing) => !editing);
        if(isEditing) {
            onChangeName(symbol, playerName);
        }
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;

    if(isEditing) {
        editablePlayerName = <input type="text" required Value={playerName} onChange={handleChange} />;
    }

    return(
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}