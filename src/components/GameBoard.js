import React from 'react';
import './GameBoard.css';

const GameBoard = ({ word, revealedTiles, onTileReveal }) => {
  const letters = word.split('');

  const handleTileClick = (index) => {
    if (!revealedTiles.includes(index)) {
      onTileReveal(index);
    }
  };

  return (
    <div className="game-board">
      <div className="tiles-container">
        {letters.map((letter, index) => {
          const isRevealed = revealedTiles.includes(index);
          
          return (
            <div
              key={index}
              className={`tile ${isRevealed ? 'revealed' : ''}`}
              onClick={() => handleTileClick(index)}
            >
              <div className="tile-inner">
                <div className="tile-front">
                  <span className="tile-number">{index + 1}</span>
                </div>
                <div className="tile-back">
                  <span className="tile-letter">{letter}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="word-display">
        <div className="word-placeholder">
          {letters.map((_, index) => (
            <div key={index} className="letter-slot">
              {revealedTiles.includes(index) ? (
                <span className="revealed-letter">{letters[index]}</span>
              ) : (
                <span className="hidden-letter">_</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
