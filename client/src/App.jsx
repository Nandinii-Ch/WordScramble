// src/App.jsx

import { useState } from "react";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";

const App = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleGameOver = (score) => {
    setFinalScore(score);
    setIsGameOver(true);
  };

  const handleRestart = () => {
    setFinalScore(0);
    setIsGameOver(false);
  };

  return (
    <div>
      {/* <h1 style={{ textAlign: "center" }}>Scramble Game</h1> */}
      {isGameOver ? (
        <ResultPage score={finalScore} onRestart={handleRestart} />
      ) : (
        <GamePage onGameOver={handleGameOver} />
      )}
    </div>
  );
};

export default App;
