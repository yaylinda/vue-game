class Player {
    constructor(socketId, username, x, y, gameId) {
        this.socketId = socketId;
        this.username = username;
        this.x = x;
        this.y = y;
        this.gameId = gameId;
        this.score = 0;
    }
}

module.exports = Player;