import React, { Component, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../css/game_over.css";
import { ResultContext } from './ResultProvider';

const GameOver = () =>{
    const {restartState} = useContext(ResultContext);
    const location = useLocation();
    const navigate = useNavigate();
    const receivedData = location.state || {}; // Default to an empty object if location.state is undefined
    const handleRestart = ()=>{
        restartState()
        navigate('/matching');
    }
    return(
        <>
        <div className="game_over_pannel">
            <h1>Game Over</h1>
            <div className="s_display">
                <div className="s_display_right prime_header">Total</div>
                <div className="s_display_value"><b>Score =</b> {receivedData.Total || 'N/A'}</div>
                <div className="s_display_value"><b>Incorrect =</b> {receivedData.Wrong || '0'}</div>
                <div className="s_display_btn round_button" onClick={handleRestart}></div>
            </div>
        </div>
        </>
    );
}

export default GameOver;