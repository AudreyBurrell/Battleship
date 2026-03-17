import './ComputerLoad.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import shipImage from './assets/shipImage.png';

function ComputerLoad() {
    
    //before anything, there should be a cute loading screen when the computer places its ships

    return (
        <div>
            <img src={shipImage} alt="ship" />
            <p>Computer is placing its pieces...</p>
        </div>
    )
}

export default ComputerLoad;