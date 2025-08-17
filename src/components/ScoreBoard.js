import React from 'react';
import './ScoreBoard.css';

const ScoreBoard = ({ score }) => {
  return (
    <div className="score-board">
      <div className="score-icon">🏆</div>
      <div className="score-content">
        <div className="score-label">Score</div>
        <div className="score-value">{score}</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
