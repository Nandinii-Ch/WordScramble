// // src/pages/GamePage.jsx

// import { useEffect, useState } from "react";
// import WordCard from "../components/WordCard";
// import Timer from "../components/Timer";
// import Score from "../components/Score";
// import Lives from "../components/Lives";
// import { calculateScore } from "../utils/scoring";
// import axios from "axios";

// const GamePage = ({ onGameOver }) => {
//   const [wordData, setWordData] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(10);
//   const [score, setScore] = useState(0);
//   const [lives, setLives] = useState(3);

//   const fetchWord = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/words");
//       setWordData(res.data);
//       setTimeLeft(10);
//     } catch (err) {
//       console.error("Error fetching word:", err);
//     }
//   };

//   useEffect(() => {
//     fetchWord();
//   }, []);

//   useEffect(() => {
//     if (!wordData) return;

//     if (timeLeft === 0) {
//       handleWrong();
//       return;
//     }

//     const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
//     return () => clearTimeout(timer);
//   }, [timeLeft, wordData]);

//   function handleGuess(guess) {
//     if (guess.toLowerCase() === wordData.original.toLowerCase()) {
//       const gained = calculateScore(timeLeft);
//       setScore(prev => prev + gained);
//       fetchWord();
//     } else {
//       handleWrong();
//     }
//   }

//   const handleWrong = () => {
//     if (lives <= 1) {
//       onGameOver(score);
//     } else {
//       setLives(prev => prev - 1);
//       fetchWord();
//     }
//   };

//   if (!wordData) return <p>Loading...</p>;

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <Timer timeLeft={timeLeft} />
//       <Score score={score} />
//       <Lives lives={lives} />
//       <WordCard
//         scrambled={wordData.scrambled}
//         hint={wordData.meaning}
//         onSubmit={handleGuess}
//       />
//     </div>
//   );
// };

// export default GamePage;

import { useEffect, useState } from "react";
import Timer from "../components/Timer";
import Score from "../components/Score";
import Lives from "../components/Lives";
import { calculateScore } from "../utils/scoring";
import axios from "axios";
import "./GamePage.css";

const GamePage = ({ onGameOver }) => {
  const [wordData, setWordData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [guess, setGuess] = useState("");

  const fetchWord = async () => {
    try {
      const res = await axios.get("http://10.0.60.172:5000/api/words");
      setWordData(res.data);
      setTimeLeft(10);
      setGuess("");
    } catch (err) {
      console.error("Error fetching word:", err);
    }
  };

  useEffect(() => {
    fetchWord();
  }, []);

  useEffect(() => {
    if (!wordData) return;

    if (timeLeft === 0) {
      handleWrong();
      return;
    }

    const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, wordData]);

  const handleWrong = () => {
    if (lives <= 1) {
      onGameOver(score);
    } else {
      setLives(prev => prev - 1);
      fetchWord();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guess.toLowerCase() === wordData.original.toLowerCase()) {
      const gained = calculateScore(timeLeft);
      setScore(prev => prev + gained);
      fetchWord();
    } else {
      handleWrong();
    }
  };

  if (!wordData) return <p>Loading...</p>;

  return (
    <div className="game-container">
      <div className="game-box">
        <div className="logo-placeholder">[ Your Logo ]</div>
        <h2 className="game-title">Scramble Game</h2>

        <Timer timeLeft={timeLeft} />
        <Score score={score} />
        <Lives lives={lives} />

        {/* Scrambled Word */}
        <div className="letter-boxes">
          {wordData.scrambled.split("").map((char, idx) => (
            <div key={idx} className="letter-box">
              {char}
            </div>
          ))}
        </div>

        {/* Input Boxes */}
        <form onSubmit={handleSubmit}>
          <div className="letter-boxes">
            {Array.from({ length: wordData.original.length }).map((_, idx) => (
              <div key={idx} className="letter-box input-box">
                {guess[idx] || ""}
              </div>
            ))}
          </div>

          {/* Hidden Input */}
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            maxLength={wordData.original.length}
            autoFocus
            style={{ opacity: 0, position: "absolute" }}
          />

          <button type="submit" className="submit-button">Submit</button>
        </form>

        {/* Hint */}
        <p className="hint">Hint: {wordData.meaning}</p>
      </div>
    </div>
  );
};

export default GamePage;
