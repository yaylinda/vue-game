const express = require('express');
const socketio = require('socket.io');

const GameManager = require('./gamemanager');

// Setup an Express server
const app = express();

// Listen on port
const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log(`Server listening on port ${port}`);

// Setup socket.io
const io = socketio(server);

// Listen for socket.io connections
io.on('connection', socket => {
  console.log(`Player connected, with socket.id=${socket.id}`, socket.id);

  socket.on('create', createGame);
  socket.on('join', joinGame);
  socket.on('input', handleInput);
  socket.on('disconnect', onDisconnect);
});

// Setup the GameManager and event handlers
const gameManager = new GameManager();

function createGame(gameId, username) {
  gameManager.createGame(this, username);
}

function joinGame(gameId, username) {
  gameManager.addPlayerToGame(this, gameId, username);
}

function handleInput(gameId, username, input) {
  gameManager.handleInput(this, gameId, username, input);
}

function onDisconnect(gameId, username) {
  gameManager.removePlayer(this, gameId, username);
}