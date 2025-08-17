import React, { useEffect, useState } from 'react';
import './GameOverlay.css';

const GameOverlay = ({ 
  gameState, 
  correctAnswer, 
  alternateAnswers, 
  onNext, 
  onRestart, 
  score, 
  timeLeft 
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (gameState === 'won') {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  const isWin = gameState === 'won';
  const isTimeout = gameState === 'timeout';
  const isWrongAnswer = gameState === 'lost';
  const timeBonus = Math.floor(timeLeft * 10);

  return (
    <div className="game-overlay">
      <div className={`overlay-content ${isWin ? 'win' : 'lose'}`}>
        {showConfetti && <Confetti />}
        
        <div className="result-icon">
          {isWin ? '🎉' : (isTimeout ? '⏰' : '❌')}
        </div>
        
        <h2 className="result-title">
          {isWin ? 'Congratulations!' : (isTimeout ? 'Time\'s Up!' : 'Wrong Answer!')}
        </h2>
        
        <div className="result-details">
          {isWin ? (
            <>
              <p className="correct-answer">
                Correct Answer: <span className="answer-highlight">{correctAnswer}</span>
              </p>
              <div className="score-breakdown">
                <div className="score-item">
                  <span>Base Score:</span>
                  <span>100</span>
                </div>
                <div className="score-item">
                  <span>Time Bonus:</span>
                  <span>+{timeBonus}</span>
                </div>
                <div className="score-item total">
                  <span>Total:</span>
                  <span>{score}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="correct-answer">
                The correct answer was: <span className="answer-highlight">{correctAnswer}</span>
              </p>
              {alternateAnswers.length > 0 && (
                <div className="alternate-answers">
                  <p>Other acceptable answers:</p>
                  <div className="answers-list">
                    {alternateAnswers.map((answer, index) => (
                      <span key={index} className="alternate-answer">{answer}</span>
                    ))}
                  </div>
                </div>
              )}
              {isTimeout && (
                <p className="timeout-message">
                  ⏰ You ran out of time! Try to be faster next time.
                </p>
              )}
              {isWrongAnswer && (
                <p className="wrong-answer-message">
                  ❌ That's not the right answer. Keep trying!
                </p>
              )}
            </>
          )}
        </div>
        
        <div className="overlay-buttons">
          {isWin ? (
            <button className="next-button" onClick={onNext}>
              Next Puzzle →
            </button>
          ) : (
            <button className="retry-button" onClick={onRestart}>
              Try Again
            </button>
          )}
          <button className="restart-button" onClick={onRestart}>
            Restart Game
          </button>
        </div>
      </div>
    </div>
  );
};

const Confetti = () => {
  return (
    <div className="confetti-container">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][Math.floor(Math.random() * 6)]
          }}
        />
      ))}
    </div>
  );
};

export default GameOverlay;
