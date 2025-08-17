import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

const Leaderboard = ({ isVisible, onClose, currentScore = 0 }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  useEffect(() => {
    loadLeaderboard();
    checkForNewScore();
  }, [currentScore]);

  const loadLeaderboard = () => {
    const saved = localStorage.getItem('wordFlipLeaderboard');
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  };

  const checkForNewScore = () => {
    if (currentScore > 0) {
      const saved = localStorage.getItem('wordFlipLeaderboard');
      const existing = saved ? JSON.parse(saved) : [];
      
      // Check if this score qualifies for leaderboard (top 10)
      const minScore = existing.length > 0 ? Math.min(...existing.map(entry => entry.score)) : 0;
      
      if (existing.length < 10 || currentScore > minScore) {
        setShowNameInput(true);
      }
    }
  };

  const saveScore = () => {
    if (!playerName.trim()) return;

    const newEntry = {
      name: playerName.trim(),
      score: currentScore,
      date: new Date().toLocaleDateString(),
      timestamp: Date.now()
    };

    const saved = localStorage.getItem('wordFlipLeaderboard');
    const existing = saved ? JSON.parse(saved) : [];
    
    // Add new score and sort by score (descending)
    const updated = [...existing, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Keep only top 10

    localStorage.setItem('wordFlipLeaderboard', JSON.stringify(updated));
    setLeaderboard(updated);
    setShowNameInput(false);
    setPlayerName('');
  };

  const clearLeaderboard = () => {
    if (window.confirm('Are you sure you want to clear all scores?')) {
      localStorage.removeItem('wordFlipLeaderboard');
      setLeaderboard([]);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="leaderboard-overlay">
      <div className="leaderboard-content">
        <div className="leaderboard-header">
          <h2>🏆 Leaderboard</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {showNameInput && (
          <div className="name-input-section">
            <h3>🎉 New High Score!</h3>
            <p>Your score: <span className="score-highlight">{currentScore}</span></p>
            <div className="name-input-container">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name..."
                maxLength={20}
                className="name-input"
                autoFocus
              />
              <button 
                onClick={saveScore}
                disabled={!playerName.trim()}
                className="save-score-button"
              >
                Save Score
              </button>
            </div>
          </div>
        )}

        <div className="leaderboard-list">
          {leaderboard.length === 0 ? (
            <div className="no-scores">
              <p>No scores yet!</p>
              <p>Complete puzzles to see your scores here.</p>
            </div>
          ) : (
            leaderboard.map((entry, index) => (
              <div key={entry.timestamp} className="leaderboard-entry">
                <div className="rank">
                  {getRankIcon(index + 1)}
                </div>
                <div className="player-info">
                  <div className="player-name">{entry.name}</div>
                  <div className="player-date">{entry.date}</div>
                </div>
                <div className="player-score">{entry.score}</div>
              </div>
            ))
          )}
        </div>

        <div className="leaderboard-actions">
          <button className="clear-button" onClick={clearLeaderboard}>
            Clear All Scores
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
