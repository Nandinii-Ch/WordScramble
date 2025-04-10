// server/server.js
const express = require("express");
const cors = require("cors");
const wordRoutes = require("./routes/wordRoutes");

const app = express();
const PORT = 5000;

app.use(cors({
  origin: "*" 
}));
app.use(express.json());

app.use("/api/words", wordRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// server/index.js

// const express = require("express");
// const cors = require("cors");

// const app = express();
// const PORT = 5000;

// app.use(cors());

// const words = [
//   { word: "react", meaning: "A JavaScript library for building user interfaces" },
//   { word: "node", meaning: "JavaScript runtime built on Chrome's V8 engine" },
//   { word: "array", meaning: "A data structure that holds a list of values" },
//   { word: "object", meaning: "A collection of key-value pairs" },
// ];

// // API route
// app.get("/api/words", (req, res) => {
//   const randomIndex = Math.floor(Math.random() * words.length);
//   res.json(words[randomIndex]);
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
