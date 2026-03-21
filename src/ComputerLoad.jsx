import './ComputerLoad.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import shipImage from './assets/shipImage.png';

function ComputerLoad() {
    const navigate = useNavigate();
    const [direction, setDirection] = useState(""); //H for horizontal, V for vertical, randomly decided
    const [ship5Location, set5ShipLocation] = useState([]); //first index row, second index col
    const [ship4Location, set4ShipLocation] = useState([]);
    const [ship3Location1, set3Ship1Location] = useState([]);
    const [ship3Location2, set3Ship2Location] = useState([]);
    const [ship2Location, set2ShipLocation] = useState([]);
    const [spacesFilled, setSpacesFilled] = useState([]); //keeps track of which places on the board already has something in it
    const [possiblePlaceShip, setPossiblePlaceShip] = useState(true); //keeps track of whether or not the computer can continue placing the ship, if false, reset the currently placed ship and start over
 
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const getRandomDirection = () => (Math.random() < 0.5 ? "H" : "V");
    const cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
 
    const buildSquares = (startRow, startColIndex, direction, length) => {
        const squares = [];
        for (let i = 0; i < length; i++) {
            if (direction === "H") {
                squares.push({ row: startRow, col: cols[startColIndex+i] });
            } else {
                squares.push({ row: startRow + i, col: cols[startColIndex] });
            }
        }
        return squares;
    }
    const isValidPlacement = (squares, occupiedSet) => {
        return squares.every(({ row, col }) => {
            const colIndex = cols.indexOf(col);
            const inBounds = row >= 1 && row <= 10 && colIndex >= 0 && colIndex <= 9;
            const notOccupied = !occupiedSet.has(`${row}-${col}`);
            return inBounds && notOccupied;
        })
    }
    const placeShip = (length, occupiedSet) => {
        while (true) {
            const direction = getRandomDirection();
            const maxRow = direction === "V" ? 10 - length + 1 : 10;
            const maxCol = direction === "H" ? 1- length : 9;
            const startRow = getRandomInt(1, maxRow + 1);
            const startColIndex = getRandomInt(0, maxCol + 1);
            const squares = buildSquares(startRow, startColIndex, direction, length);
            if(isValidPlacement(squares, occupiedSet)) {
                squares.forEach(({ row, col }) => occupiedSet.add(`${row}-${col}`));
                return squares;
            }
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            const occupiedSet = new Set();
            const ship5 = placeShip(5, occupiedSet);
            const ship4 = placeShip(4, occupiedSet);
            const ship3a = placeShip(3, occupiedSet);
            const ship3b = placeShip(3, occupiedSet);
            const ship2 = placeShip(2, occupiedSet);

            sessionStorage.setItem('ship5Computer', JSON.stringify(ship5));
            sessionStorage.setItem('ship4Computer', JSON.stringify(ship4));
            sessionStorage.setItem('ship3aComputer', JSON.stringify(ship3a));
            sessionStorage.setItem('ship3bComputer', JSON.stringify(ship3b));
            sessionStorage.setItem('ship2Computer', JSON.stringify(ship2));

            //NAVIGATE TO NEW GAME

        }, 2000)
    }, []);


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