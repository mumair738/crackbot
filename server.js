const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the current directory
app.use(express.static(__dirname));

// Trivia questions
const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: 1
  },
  // Add more questions as needed
];

let currentQuestion = 0;
let scores = {};
let players = [];

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinGame', (playerName) => {
    if (!players.includes(playerName)) {
      players.push(playerName);
      scores[playerName] = 0;
      socket.playerName = playerName;
      io.emit('updatePlayers', players);
      io.emit('updateScores', scores);
    }
  });

  socket.on('startGame', () => {
    if (players.length > 0) {
      currentQuestion = 0;
      io.emit('gameStart', questions[currentQuestion]);
    }
  });

  socket.on('answer', (selectedOption) => {
    if (questions[currentQuestion]) {
      const correct = selectedOption === questions[currentQuestion].answer;
      if (correct && socket.playerName) {
        scores[socket.playerName]++;
      }
      socket.emit('answerResult', { correct, correctAnswer: questions[currentQuestion].answer });
      io.emit('updateScores', scores);
    }
  });

  socket.on('nextQuestion', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      io.emit('newQuestion', questions[currentQuestion]);
    } else {
      io.emit('gameEnd', scores);
    }
  });

  socket.on('disconnect', () => {
    if (socket.playerName) {
      players = players.filter(p => p !== socket.playerName);
      delete scores[socket.playerName];
      io.emit('updatePlayers', players);
      io.emit('updateScores', scores);
    }
  });
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});