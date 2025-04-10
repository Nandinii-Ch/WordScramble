// src/utils/scoring.js

export function calculateScore(timeLeft) {
    if (timeLeft >= 8) return 10;
    if (timeLeft >= 5) return 5;
    return 3;
  }
  