var gameName = "Control.IO"

var lobbyWaitingMessage = "Waiting for players..."
var lobbyJoinInstructionMessage = "Press SPACE to join by keyboard, or connect a controller"
var lobbyJoinControllerInstructionMessage = "Controller detected.<br><br>Press START to join."

var max_x = window.innerWidth;
var min_x = -max_x;
var max_y = window.innerHeight;
var min_y = -max_y;

var player_max_velocity = .05;
var players = []; //array of players
var player_radius = .07;

//used to set the bounds of the canvas.?
var canvas_multiplier = 335;

var debug = false;

var zoom_percent = 100;

var controllers = [];
