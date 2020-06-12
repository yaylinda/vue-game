import express from 'express';
import socketio from 'socket.io';

import GameManager from './gamemanager.js';
import StateManager from './statemanager.js';

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
  console.log(`Got socket connection from socketId=${socket.id}`);
  
  socket.on('getStateBySessionCookie', getStateBySessionCookie);
  socket.on('setUsernameForSessionCookie', setUsernameForSessionCookie);


  socket.on('create', createGame);
  socket.on('join', joinGame);
  socket.on('input', handleInput);
  socket.on('disconnect', onDisconnect);
});

// Set up the StateManager and event handlers

const stateManager = new StateManager();

function getStateBySessionCookie(sessionCookie) {
  stateManager.getStateBySessionCookie(this, sessionCookie);
}

function setUsernameForSessionCookie(sessionCookie, username) {
  stateManager.setUsernameForSessionCookie(this, sessionCookie, username);
}


// Setup the GameManager and event handlers

const gameManager = new GameManager();

// TODO - not used?
function onConnect(socket) {
  gameManager.onConnect(socket);
}

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
  gameManager.onDisconnect(this, gameId, username);
}
