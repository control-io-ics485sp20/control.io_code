const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const socketio = require('socket.io');

const webpackConfig = require('../../webpack.dev.js');

const Constants = require('../shared/constants');

const Game = require('./game');

const app = express();
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
  // Setup Webpack for development
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  // Static serve the dist/ folder in production
  app.use(express.static('dist'));
}
const port = process.env.PORT || Constants.PORT;
const server = app.listen(port);
console.log(`Control.IO Server listening on port ${port}`);

const io = socketio(server);

io.on('connection', socket => {
    console.log('Player connected!', socket.id);
  
    socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
    socket.on(Constants.MSG_TYPES.INPUT, handleInput);
    socket.on('disconnect', onDisconnect);
});


// ...

// Setup the Game
const game = new Game();

function joinGame(username) {
    game.addPlayer(this, username);
}

function handleInput(dir) {
    game.handleInput(this, dir);
}

function onDisconnect() {
    console.log("Player has left the game.");
    game.removePlayer(this);
}