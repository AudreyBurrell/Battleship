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

    let shipsPositioned = 0; //keeps track of how many ships the user has on the board

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
        setShip("3-Space Crusier");
        return;
    }
    const handle2Ship = () => {
        isSelected(true);
        setShip("2-Space Destroyer")
        return;
    }
    //function that handles when the board buttons are pressed
    const handleBoardPressed = () => {
        return;
    }

    const handleCloseShipPopup = () => {
        isSelected(false);
        return;
    }
    const handlePlaceShip = () => {
        //checks if the piece positions are valid
        //updates spacesFilled
        //updates the location of the corresponding ship
        //adds 1 to shipsPositioned
        shipsPositioned += 1;
        //checks to make sure if the user can move on to the next page
        if (shipsPositioned == 5) {
            setContinueEnabled(true);
        }
        isSelected(false); //to close the popup 
        //make sure that the corresponding button is disabled (eventually have a way that the user can go back and edit)
        return;
    }
    const handlePlay = () => {
        //need to make the page where the user goes
        //determines where the computer's pieces are
        //make sure to save everything to local or session storage
        navigate('/play-game');
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
                    <div key={col+row} id={`col${col}row${row+1}`} onClick={handleBoardPressed}></div>
                    ))
                )}
            </div>
            </div>
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
                            <button key={col+row} id={`col${col}row${row+1}`}></button>
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

/*
To do:
1. When the user selects something 
    a. the user can go back without doing anything DONE
    b. the user can set their piece (store in local/session storage the location)  
        1. then the color on the board changes to match the ship
        2. and the select button becomes disabled
    c. the user can undo a piece location
2. When all the pieces are in place, the user can click the play button
3. Before actually going to the next page, add code to set the computer's ships (or maybe I can
have a cute loading screen)

*/