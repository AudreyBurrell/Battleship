import './SetBoard.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SetBoard() {
    // const navigate = useNavigate();
    // const handleLogin = () => {
    //     navigate('/set-board')
    // }
    
    //the states/variables
    const [shipSelected, isSelected] = useState(false); //determines if the popup shows
    const [currentShipSelected, setShip] = useState(null); //determines which ship was selected
    const [ship5Location, set5ShipLocation] = useState([]); //first index row, second index col
    const [ship4Location, set4ShipLocation] = useState([]);
    const [ship3Location1, set3Ship1Location] = useState([]);
    const [ship3Location2, set3Ship2Location] = useState([]);
    const [ship2Location, set2ShipLocation] = useState([]);
    let shipsPositioned = 0; //keeps track of how many ships the user has on the board

    //functions to handle what happens when the ships are selected
    const handle5Ship = () => {
        return;
    }
    const handle4Ship = () => {
        return;
    }
    const handle3Ship1 = () => {
        return;
    }
    const handle3Ship2 = () => {
        return;
    }
    const handle2Ship = () => {
        return;
    }

    //creating the board
    const cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    return (
        <div>
            <h1>Set Board</h1>
            <div className="main">
            <div className="pieceMenu">
                <div className="piece">
                    <p>5-space Carrier</p>
                    <button onClick={handle5Ship}>Select</button>
                </div>
                <div className="piece">
                    <p>4-space Battleship</p>
                    <button onClick={handle4Ship}>Select</button>
                </div>
                <div className="piece">
                    <p>3-space Cruiser</p>
                    <button onClick={handle3Ship1}>Select</button>
                </div>
                <div className="piece">
                    <p>3-space Cruiser</p>
                    <button onClick={handle3Ship2}>Select</button>
                </div>
                <div className="piece">
                    <p>2-space Destroyer</p>
                    <button onClick={handle2Ship}>Select</button>
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
To do:
1. When the user selects something 
    a. the user can go back without doing anything
    b. the user can set their piece (store in local/session storage the location)  
        1. then the color on the board changes to match the ship
        2. and the select button becomes disabled
    c. the user can undo a piece location
2. When all the pieces are in place, the user can click the play button
3. Before actually going to the next page, add code to set the computer's ships (or maybe I can
have a cute loading screen)

*/