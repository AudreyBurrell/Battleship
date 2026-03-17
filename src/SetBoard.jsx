import './SetBoard.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SetBoard() {
    const navigate = useNavigate();
    
    //the states/variables
    const [shipSelected, isSelected] = useState(false); //determines if the popup shows
    const [currentShipSelected, setShip] = useState(null); //determines which ship was selected
    const [ship5Location, set5ShipLocation] = useState([]); //first index row, second index col
    const [ship4Location, set4ShipLocation] = useState([]);
    const [ship3Location1, set3Ship1Location] = useState([]);
    const [ship3Location2, set3Ship2Location] = useState([]);
    const [ship2Location, set2ShipLocation] = useState([]);
    const [currentSelectedSquares, setCurrentSelectedSquares] = useState([]); //for making sure the right amount is selected and that they are consecutive
    const [spacesFilled, setSpacesFilled] = useState([]) //(row, col), for filling in the buttons if a ship is already there
    const [continueEnabled, setContinueEnabled] = useState(false); //sees if the user can continue
    const [shipsPositioned, setShipsPositioned] = useState(0);  //keeps track of how many ships the user has on the board

    //clearing the storage
    sessionStorage.setItem('ship5User', "");
        sessionStorage.setItem('ship4User', "");
        sessionStorage.setItem('ship3aUser', "");
        sessionStorage.setItem('ship3bUser', "");
        sessionStorage.setItem('ship2User', "");

    //functions to handle what happens when the ships are selected
    const handle5Ship = () => {
        isSelected(true);
        setShip("5-Space Carrier")
        return;
    }
    const handle4Ship = () => {
        isSelected(true);
        setShip("4-Space Battleship")
        return;
    }
    const handle3Ship1 = () => {
        isSelected(true);
        setShip("3-Space Cruiser");
        return;
    }
    const handle3Ship2 = () => {
        isSelected(true);
        setShip("3-Space Ship");
        return;
    }
    const handle2Ship = () => {
        isSelected(true);
        setShip("2-Space Destroyer")
        return;
    }
    //function that handles when the board buttons are pressed
    const handleBoardPressed = (row, col) => {
        const alreadySelected = currentSelectedSquares.some(
            s => s.row === row && s.col === col
        );
        if(alreadySelected) {
            setCurrentSelectedSquares(prev => prev.filter(s => ! (s.row === row && s.col === col)));
        } else {
            setCurrentSelectedSquares(prev => [...prev, { row, col }]);
        }
        return;
    }

    const handleCloseShipPopup = () => {
        isSelected(false);
        setCurrentSelectedSquares([]);
        return;
    }

    const getShipLength = () => {
        switch (currentShipSelected) {
            case "5-Space Carrier": return 5;
            case "4-Space Battleship": return 4;
            case "3-Space Cruiser": return 3;
            case "3-Space Ship": return 3;
            case "2-Space Destroyer": return 2;
            default: return 0;
        }
    }
    const isValidPlacement = (squares, requiredLength) => {
        if (squares.length !== requiredLength) return false;
        const rows = squares.map(s => s.row);
        const colIndices = squares.map(s => cols.indexOf(s.col)); 
        const allSameRow = rows.every(r => r === rows[0]);
        const allSameCol = colIndices.every(c => c === colIndices[0]); 
        if (!allSameRow && !allSameCol) return false;
        const values = allSameRow ? [...colIndices].sort((a, b) => a - b) 
                                : [...rows].sort((a, b) => a - b);
        for (let i = 1; i < values.length; i++) {
            if (values[i] !== values[i - 1] + 1) return false;
        }

        return true;
    };
    const handlePlaceShip = () => {
        //checks if the piece positions are valid
        const requiredLength = getShipLength();
        if(!isValidPlacement(currentSelectedSquares, requiredLength)) {
            alert(`Invalid placement! Select exactly ${requiredLength} consecutive squares in a straight line.`);
            return;
        }
        switch (currentShipSelected) {
            case "5-Space Carrier": set5ShipLocation(currentSelectedSquares); break;
            case "4-Space Battleship": set4ShipLocation(currentSelectedSquares); break;
            case "3-Space Cruiser": set3Ship1Location(currentSelectedSquares); break;
            case "3-Space Ship": set3Ship2Location(currentSelectedSquares); break;
            case "2-Space Destroyer": set2ShipLocation(currentSelectedSquares); break;
            
        }
        setSpacesFilled(prev => [...prev, ...currentSelectedSquares]);
        setShipsPositioned(prev => {
            const newCount = prev + 1;
            if (newCount === 5) setContinueEnabled(true);
            return newCount;
        });
        isSelected(false); //to close the popup 
        setCurrentSelectedSquares([]);
        return;
    }
    const handlePlay = () => {
        console.log("5-square:", ship5Location);
        console.log("4-square", ship4Location);
        console.log("3-square 1:", ship3Location1);
        console.log("3-square 2", ship3Location2);
        console.log("2-square", ship2Location);
        //make sure to save everything to local or session storage
        sessionStorage.setItem('ship5User', JSON.stringify(ship5Location));
        sessionStorage.setItem('ship4User', JSON.stringify(ship4Location));
        sessionStorage.setItem('ship3aUser', JSON.stringify(ship3Location1));
        sessionStorage.setItem('ship3bUser', JSON.stringify(ship3Location2));
        sessionStorage.setItem('ship2User', JSON.stringify(ship2Location));
        //navigating to the game page
        navigate('/computer-load');
    }

    //preventing the user from trying to add a ship that is already on the board
    const isShipPlaced = (shipName) => {
        switch (shipName) {
            case "5-Space Carrier": return ship5Location.length > 0;
            case "4-Space Battleship": return ship4Location.length > 0;
            case "3-Space Cruiser": return ship3Location1.length > 0;
            case "3-Space Ship": return ship3Location2.length > 0;
            case "2-Space Destroyer": return ship2Location.length > 0;
            default: return false;
        }
    };
    //creating the board
    const cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    return (
        <div>
            <h1>Set Board</h1>
            {!shipSelected && (
                <div className="main">
                    <div className="pieceMenu">
                        <div className="piece">
                            <p>5-space Carrier</p>
                            <button onClick={handle5Ship} disabled={isShipPlaced("5-Space Carrier")}>Select</button>
                        </div>
                        <div className="piece">
                            <p>4-space Battleship</p>
                            <button onClick={handle4Ship} disabled={isShipPlaced("4-Space Battleship")}>Select</button>
                        </div>
                        <div className="piece">
                            <p>3-space Cruiser</p>
                            <button onClick={handle3Ship1} disabled={isShipPlaced("3-Space Cruiser")}>Select</button>
                        </div>
                        <div className="piece">
                            <p>3-space Ship</p>
                            <button onClick={handle3Ship2} disabled={isShipPlaced("3-Space Ship")}>Select</button>
                        </div>
                        <div className="piece">
                            <p>2-space Destroyer</p>
                            <button onClick={handle2Ship} disabled={isShipPlaced("2-Space Destroyer")}>Select</button>
                        </div>
                    </div>

                    <div className="board">
                        {Array.from({ length: 10 }, (_, row) =>
                            cols.map(col => (
                                <div
                                    key={col + row}
                                    id={`col${col}row${row + 1}`}
                                    onClick={() => handleBoardPressed(row + 1, col)}
                                    style={{
                                        backgroundColor: spacesFilled.some(
                                            s => s.row === row + 1 && s.col === col
                                        ) ? "gray" : ""
                                    }}
                                >
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
            {shipSelected && (
                //popup stuff goes in here
                //(this first div covers everything)
                //the place piece button should check if the spaces and stuff is correct
                //(for the board div, make sure buttons with ships already on them are disabled)
                <div className="cover"> 
                    <div className="pieceSelectedView">
                        <p>{currentShipSelected}</p>
                        <p>Select places on the board to place your ship. They must be connecting vertically/horizontally.</p>
                        <button onClick={handleCloseShipPopup}>X</button>
                        <button onClick={handlePlaceShip}>Place Ship</button>
                    </div>
                    <div className="board">
                        {Array.from({ length: 10 }, (_, row) =>
                            cols.map(col => (
                            <button
                                key={col + row}
                                id={`col${col}row${row + 1}`}
                                onClick={() => handleBoardPressed(row + 1, col)}
                                disabled={spacesFilled.some(s => s.row === row + 1 && s.col === col)}
                                style={{
                                    backgroundColor: currentSelectedSquares.some(
                                        s => s.row === row + 1 && s.col === col
                                    ) ? "lightblue" : spacesFilled.some(
                                        s => s.row === row + 1 && s.col === col
                                    ) ? "gray" : ""
                                }}
                            >
                            </button>
                            ))
                        )}
                    </div>
                </div> 
            )}
            {continueEnabled && (
                <button onClick={handlePlay}>Play</button>
            )}
        </div>
    )
}

export default SetBoard;

