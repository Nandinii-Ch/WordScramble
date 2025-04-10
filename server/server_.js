// 1️⃣ Import required packages
const express = require('express');             // Express framework to handle routes and server
const mongoose = require('mongoose');           // ODM to connect with MongoDB
const cors = require('cors');                   // To allow requests from frontend (React)
require('dotenv').config();                     // Load environment variables from .env file

// 2️⃣ Create an Express app
const app = express();

// 3️⃣ Middleware to parse JSON and enable CORS
app.use(cors());                                // Allow cross-origin requests
app.use(express.json());                        // Parse incoming JSON request bodies

// 4️⃣ Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// 5️⃣ Define a Mongoose schema for the 'Word'
const wordSchema = new mongoose.Schema({
  text: String,           // The actual word, like "apple"
  level: String           // Difficulty level: "easy", "medium", or "hard"
});

// 6️⃣ Create a model based on the schema
const Word = mongoose.model('Word', wordSchema);

// 7️⃣ Utility function to scramble a word
function scrambleWord(word) {
  return word.split('').sort(() => 0.5 - Math.random()).join('');
}

// 8️⃣ API to get a random word by difficulty level
app.get('/api/word/:level', async (req, res) => {
  const { level } = req.params;

  try {
    const words = await Word.find({ level });       // Fetch words from DB with the given level
    if (words.length === 0) {
      return res.status(404).json({ message: 'No words found' });
    }

    const randomWord = words[Math.floor(Math.random() * words.length)];
    const scrambled = scrambleWord(randomWord.text);

    res.json({
      original: randomWord.text,
      scrambled
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 9️⃣ Optional: API to seed words into DB
app.post('/api/seed', async (req, res) => {
  const sampleWords = [
    { text: 'cat', level: 'easy' },
    { text: 'banana', level: 'medium' },
    { text: 'mysterious', level: 'hard' },
    { text: 'dog', level: 'easy' },
    { text: 'laptop', level: 'medium' },
    { text: 'encyclopedia', level: 'hard' },
  ];

  try {
    await Word.insertMany(sampleWords);
    res.json({ message: '✅ Words seeded successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error seeding words' });
  }
});

// 🔟 Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://10.0.35.200:${PORT}`);
});
