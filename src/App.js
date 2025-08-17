import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import Timer from './components/Timer';
import ScoreBoard from './components/ScoreBoard';
import GameOverlay from './components/GameOverlay';
import Leaderboard from './components/Leaderboard';
import MobileKeyboardHandler from './components/MobileKeyboardHandler';
import './components/MobileKeyboardHandler.css';
import puzzleData from './data/puzzles.json';

function App() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [gameState, setGameState] = useState('menu'); // menu, playing, won, lost, timeout
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [revealedTiles, setRevealedTiles] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const puzzle = puzzleData.puzzles[currentPuzzle];

  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState('timeout');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState]);

  const startGame = () => {
    setGameState('playing');
    setTimeLeft(puzzle.timeLimit);
    setRevealedTiles([]);
    setUserAnswer('');
    setShowHint(false);
  };

  const nextPuzzle = () => {
    if (currentPuzzle < puzzleData.puzzles.length - 1) {
      setCurrentPuzzle(currentPuzzle + 1);
      setGameState('menu');
    } else {
      // Game completed
      setGameState('completed');
    }
  };

  const resetGame = () => {
    setCurrentPuzzle(0);
    setGameState('menu');
    setScore(0);
    setTimeLeft(60);
    setRevealedTiles([]);
    setUserAnswer('');
    setShowHint(false);
  };

  const checkAnswer = (answer) => {
    const correctAnswers = [puzzle.word, ...puzzle.alternateAnswers];
    const isCorrect = correctAnswers.some(
      correct => correct.toLowerCase() === answer.toLowerCase()
    );

    if (isCorrect) {
      const timeBonus = Math.floor(timeLeft * 10);
      const newScore = score + 100 + timeBonus;
      setScore(newScore);
      setGameState('won');
    } else {
      setGameState('lost');
    }
  };

  const handleTileReveal = (index) => {
    if (gameState !== 'playing') return;
    
    setRevealedTiles(prev => {
      if (prev.includes(index)) return prev;
      return [...prev, index];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userAnswer.trim()) {
      checkAnswer(userAnswer.trim());
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#4ade80';
      case 'medium': return '#fbbf24';
      case 'hard': return '#f87171';
      default: return '#6b7280';
    }
  };

  if (gameState === 'menu') {
    return (
      <div className="app">
        <div className="menu-container">
          <h1 className="game-title">Word Flip Puzzle</h1>
          <div className="puzzle-info">
            <h2>Puzzle {currentPuzzle + 1} of {puzzleData.puzzles.length}</h2>
            <div className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(puzzle.difficulty) }}>
              {puzzle.difficulty.toUpperCase()}
            </div>
            <p className="category">{puzzle.category}</p>
            <p className="time-limit">Time Limit: {puzzle.timeLimit}s</p>
          </div>
          <button className="start-button" onClick={startGame}>
            Start Puzzle
          </button>
          <div className="score-display">
            <p>Current Score: {score}</p>
          </div>
          <button className="leaderboard-button" onClick={() => setShowLeaderboard(true)}>
            🏆 Leaderboard
          </button>
        </div>
        <Leaderboard 
          isVisible={showLeaderboard}
          onClose={() => setShowLeaderboard(false)}
          currentScore={score}
        />
      </div>
    );
  }

  if (gameState === 'completed') {
    return (
      <div className="app">
        <div className="menu-container">
          <h1 className="game-title">🎉 Congratulations! 🎉</h1>
          <p className="final-score">Final Score: {score}</p>
          <p className="completion-message">You've completed all puzzles!</p>
          <button className="start-button" onClick={resetGame}>
            Play Again
          </button>
          <button className="leaderboard-button" onClick={() => setShowLeaderboard(true)}>
            🏆 View Leaderboard
          </button>
        </div>
        <Leaderboard 
          isVisible={showLeaderboard}
          onClose={() => setShowLeaderboard(false)}
          currentScore={score}
        />
      </div>
    );
  }

  return (
    <MobileKeyboardHandler>
      <div className="app">
        <div className="game-header">
          <Timer timeLeft={timeLeft} totalTime={puzzle.timeLimit} />
          <ScoreBoard score={score} />
        </div>

        <div className="game-container">
          <div className="puzzle-info-bar">
            <span className="difficulty" style={{ color: getDifficultyColor(puzzle.difficulty) }}>
              {puzzle.difficulty.toUpperCase()}
            </span>
            <span className="category">{puzzle.category}</span>
            <button 
              className="hint-button"
              onClick={() => setShowHint(!showHint)}
            >
              💡 Hint
            </button>
          </div>

          {showHint && (
            <div className="hint-container">
              <p className="hint-text">{puzzle.hint}</p>
            </div>
          )}

          <GameBoard
            word={puzzle.word}
            revealedTiles={revealedTiles}
            onTileReveal={handleTileReveal}
          />

          <form className="answer-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="answer-input"
              disabled={gameState !== 'playing'}
              autoFocus
            />
            <button 
              type="submit" 
              className="submit-button"
              disabled={gameState !== 'playing' || !userAnswer.trim()}
            >
              Submit
            </button>
          </form>
        </div>

        {(gameState === 'won' || gameState === 'lost' || gameState === 'timeout') && (
          <GameOverlay
            gameState={gameState}
            correctAnswer={puzzle.word}
            alternateAnswers={puzzle.alternateAnswers}
            onNext={nextPuzzle}
            onRestart={resetGame}
            score={score}
            timeLeft={timeLeft}
          />
        )}
      </div>
    </MobileKeyboardHandler>
  );
}

export default App;
