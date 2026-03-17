import './ComputerLoad.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import shipImage from './assets/shipImage.png';

function ComputerLoad() {

    const [direction, setDirection] = useState(""); //H for horizontal, V for vertical, randomly decided
    const [ship5Location, set5ShipLocation] = useState([]); //first index row, second index col
    const [ship4Location, set4ShipLocation] = useState([]);
    const [ship3Location1, set3Ship1Location] = useState([]);
    const [ship3Location2, set3Ship2Location] = useState([]);
    const [ship2Location, set2ShipLocation] = useState([]);
    const [spacesFilled, setSpacesFilled] = useState([]); //keeps track of which places on the board already has something in it
    const [possiblePlaceShip, setPossiblePlaceShip] = useState(true); //keeps track of whether or not the computer can continue placing the ship, if false, reset the currently placed ship and start over


    // Initialize a 10x10 grid filled with null (null = empty, "ship" = occupied)
    const [board, setBoard] = useState(
        Array.from({ length: 10 }, () => Array(10).fill(null))
    );
    const placeShipOnBoard = (squares) => {
        setBoard(prev => {
            const newBoard = prev.map(row => [...row]); // copy the board
            squares.forEach(({ row, col }) => {
                newBoard[row][col] = "ship";
            });
            return newBoard;
        });
    };

    //getting random starting point
    let currentRow;
    let currentCol;
    const determineRowCol = () => {
        currentRow = getRandomRow(1, 11);
        currentCol = getRandomCol();
    }
    const getRandomRow = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    const getRandomCol = () => {
        let randomNumber = getRandomRow(1, 11); //just using this function to get a random number
        const cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        return cols[randomNumber];
    }
    //determine random direction (horizontal/vertical)
    const determineDirection = () => {
        //0 for H, 1 for V
        let randomNumber = getRandomRow(0, 2);
        if(randomNumber == 0) {
            return "H";
        } else {
            return "V";
        }
    }


    /*
    Order of operations:
    Computer places 5 ship
    Computer places 4 ship
    Computer places first 3 ship
    Computer places second 3 ship
    Computer places 2 ship
    Make sure to save everything to session storage
    */
    
    //before anything, there should be a cute loading screen when the computer places its ships

    return (
        <div>
            <img src={shipImage} alt="ship" />
            <p>Computer is placing its pieces...</p>
        </div>
    )
}

export default ComputerLoad;