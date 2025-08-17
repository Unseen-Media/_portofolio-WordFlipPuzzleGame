# Word Flip Puzzle Game

A browser-based word puzzle game built with React where players flip tiles to reveal letters under a countdown timer. Features smooth 60fps animations, JSON-driven puzzle data, and responsive design for both mobile and desktop.

## 🎮 Features

- **Interactive Tile Flipping**: 3D flip animations with smooth 60fps performance
- **Countdown Timer**: Visual timer with color-coded progress indicator
- **JSON-Driven Puzzles**: Easy to add new puzzles with multiple difficulty levels
- **Alternate Answers**: Support for multiple correct answers per puzzle
- **Animated Feedback**: Confetti effects for wins, smooth overlays for results
- **Responsive Design**: Optimized for mobile and desktop devices
- **Score System**: Base score + time bonus calculation
- **Hint System**: Optional hints to help players
- **Progressive Difficulty**: Easy, medium, and hard puzzle categories

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd word-flip-puzzle
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🎯 How to Play

1. **Start a Puzzle**: Click "Start Puzzle" to begin
2. **Flip Tiles**: Click on numbered tiles to reveal letters
3. **Solve the Word**: Use the revealed letters to guess the complete word
4. **Submit Answer**: Type your answer and click "Submit"
5. **Beat the Timer**: Complete the puzzle before time runs out!

### Scoring System

- **Base Score**: 100 points for correct answer
- **Time Bonus**: +10 points per second remaining
- **Total Score**: Base + Time Bonus

## 📁 Project Structure

```
word-flip-puzzle/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── GameBoard.js          # Tile flipping mechanics
│   │   ├── GameBoard.css
│   │   ├── Timer.js              # Countdown timer
│   │   ├── Timer.css
│   │   ├── ScoreBoard.js         # Score display
│   │   ├── ScoreBoard.css
│   │   ├── GameOverlay.js        # Win/loss feedback
│   │   └── GameOverlay.css
│   ├── App.js                    # Main game logic
│   ├── App.css                   # Main styles
│   ├── index.js                  # React entry point
│   └── index.css                 # Global styles
├── data/
│   └── puzzles.json              # Puzzle definitions
├── package.json
└── README.md
```

## 🧩 Adding New Puzzles

Edit `data/puzzles.json` to add new puzzles:

```json
{
  "id": 11,
  "word": "EXAMPLE",
  "alternateAnswers": ["EXAMPL"],
  "hint": "A representative form or pattern",
  "difficulty": "medium",
  "timeLimit": 45,
  "category": "General"
}
```

### Puzzle Properties

- **word**: The correct answer (required)
- **alternateAnswers**: Array of other acceptable answers
- **hint**: Helpful clue for players
- **difficulty**: "easy", "medium", or "hard"
- **timeLimit**: Time in seconds
- **category**: Puzzle category for organization

## 🎨 Technical Features

### Animations
- **3D Tile Flips**: CSS transforms with preserve-3d
- **Smooth Transitions**: 60fps cubic-bezier animations
- **Confetti Effects**: Dynamic particle system for wins
- **Progress Indicators**: Animated timer and score updates

### Performance Optimizations
- **CSS Hardware Acceleration**: transform3d for smooth animations
- **Efficient Re-renders**: React state management
- **Mobile Optimizations**: Touch-friendly interactions
- **Responsive Images**: Optimized for different screen sizes

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Friendly**: Proper ARIA labels
- **High Contrast**: Readable color schemes
- **Focus Management**: Clear focus indicators

## 📱 Responsive Design

The game is fully responsive and optimized for:
- **Desktop**: Full feature set with hover effects
- **Tablet**: Touch-optimized interactions
- **Mobile**: Compact layout with touch-friendly buttons

## 🛠️ Built With

- **React 18**: Modern React with hooks
- **CSS3**: Advanced animations and responsive design
- **JSON**: Data-driven puzzle system
- **ES6+**: Modern JavaScript features

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify/Vercel

1. Build the project: `npm run build`
2. Upload the `build` folder to your hosting service
3. Configure routing for single-page application

## 🎯 Future Enhancements

- [ ] Sound effects and background music
- [ ] Local storage for high scores
- [ ] Multiplayer mode
- [ ] Custom puzzle creator
- [ ] Achievement system
- [ ] Dark mode theme
- [ ] PWA capabilities

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or support, please open an issue on GitHub.

---

**Enjoy playing Word Flip Puzzle! 🎉**
