const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

class GameManager {
 
    constructor() {
        this.sockets = {};
        this.games = {};
        this.players = {};

        // TODO - uncomment this when ready
        // setInterval(this.update.bind(this), 1000 / 60);
    }

    onConnect(socket) {
        console.log(`onConnect - socket.id: ${socket.id}`);
        // TODO
    }

    createGame(socket, username) {
        console.log(`createGame - socket.id: ${socket.id}, username: ${username},`);
        // TODO
    }

    joinGame(socket, gameId, username) {
        console.log(`joinGame - socket.id: ${socket.id}, gameId: ${gameId}, username: ${username},`);
        // TODO
    }

    handleInput(socket, gameId, username, input) {
        console.log(`handleInput - socket.id: ${socket.id}, gameId: ${gameId}, username: ${username}, input: ${input},`);
        // TODO
    }

    onDisconnect(socket, gameId, username) {
        console.log(`onDisconnect - socket.id: ${socket.id}, username: ${username},`);
        // TODO
    }

    update() {
        console.log('Game update!');
        // TODO
    }
}

module.exports = GameManager;