const Constants = require('../shared/constants');
const Player = require('./player');

class Game {
    constructor() {
        this.sockets = {};
        this.players = {};
    }

    addPlayer(socket, username) {
        this.sockets[socket.id] = socket;
    
        // Generate a position to start this player at.
        const color = "#4d88d5";
        const xpos = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
        const ypos = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
        this.players[socket.id] = new Player(socket.id, username, xpos, ypos, color);
    }

    removePlayer(socket) {
        delete this.sockets[socket.id];
        delete this.players[socket.id];
    }
}

module.exports = Game;