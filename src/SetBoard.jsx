import './SetBoard.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SetBoard() {
    // const navigate = useNavigate();
    // const handleLogin = () => {
    //     navigate('/set-board')
    // }

    //creating the board
    const cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    return (
        <div>
            <h1>Set Board</h1>
            <div className="main">
            <div className="pieceMenu">
                <div className="piece">
                    <p>5-space Carrier</p>
                    <button>Select</button>
                </div>
                <div className="piece">
                    <p>4-space Battleship</p>
                    <button>Select</button>
                </div>
                <div className="piece">
                    <p>3-space Cruiser</p>
                    <button>Select</button>
                </div>
                <div className="piece">
                    <p>3-space Cruiser</p>
                    <button>Select</button>
                </div>
                <div className="piece">
                    <p>2-space Destroyer</p>
                    <button>Select</button>
                </div>
            </div>

            <div className="board">
                {Array.from({ length: 10 }, (_, row) =>
                    cols.map(col => (
                    <div key={col+row} id={`col${col}row${row+1}`}></div>
                    ))
                )}
            </div>
            </div>
        </div>
    )
}

export default SetBoard;

/*

The different ships:
1 5-space carrier
1 4-space battleship
2 3-space crusier
1 2-space destroyer

*/