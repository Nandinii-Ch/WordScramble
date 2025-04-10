// Shows scrambled words and input

// src/components/WordCard.jsx

import { useState } from "react";

const WordCard = ({ scrambled, hint, onSubmit }) => {
  const [guess, setGuess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(guess);
    setGuess("");
  };

  return (
    <div>
      <h2>🔀 {scrambled}</h2>
      <p><strong>Hint:</strong> {hint}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Your guess..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WordCard;
