import React from 'react';
import './Timer.css';

const Timer = ({ timeLeft, totalTime }) => {
  const percentage = (timeLeft / totalTime) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const getTimeColor = () => {
    if (percentage > 60) return '#10b981';
    if (percentage > 30) return '#fbbf24';
    return '#f87171';
  };

  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <div className="timer-container">
      <div className="timer-display">
        <div className="time-text">
          {minutes}:{formatTime(seconds)}
        </div>
        <div className="timer-progress">
          <div 
            className="timer-bar"
            style={{ 
              width: `${percentage}%`,
              backgroundColor: getTimeColor()
            }}
          />
        </div>
      </div>
      <div className="timer-icon">⏰</div>
    </div>
  );
};

export default Timer;
