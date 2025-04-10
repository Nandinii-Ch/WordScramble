// server/controllers/wordController.js

const words = require("../data/words");

function scrambleWord(word) {
    // Convert the word into an array of characters
    let chars = word.split('');
    
    // Fisher-Yates (Knuth) shuffle algorithm for proper randomization
    for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]]; // Swap
    }
    
    const scrambled = chars.join('');
    
    // Ensure the scrambled word is not the same as the original
    return scrambled === word ? scrambleWord(word) : scrambled;
}
let wordQueue = shuffle([...words]);

function shuffle(array) {
  const result = [...array]; // Copy array
  for (let i = 0; i < result.length; i++) {
    const j = Math.floor(Math.random() * result.length);
    [result[i], result[j]] = [result[j], result[i]]; // Swap i and j
  }
  console.log(result);
  return result;
  
}

const getWord = (req, res) => {
  const randomWord = wordQueue.pop() 
  if (wordQueue.length === 0) {
    wordQueue = shuffle([...words]);
  }
  const scrambled = scrambleWord(randomWord.word);

  res.json({
    original: randomWord.word,
    scrambled,
    meaning: randomWord.meaning
  });
};

module.exports = { getWord };
