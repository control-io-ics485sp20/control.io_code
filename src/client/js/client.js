
//Web JS Project that implements THREE.js.
//Literally based off of tutorial:
//https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene

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

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( zoom_percent, max_x / max_y, 1, 1000 );
// var camera = new THREE.OrthographicCamera( max_x / - 2, max_x / 2, max_y / 2, max_y / - 2, max_x, max_y );
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( max_x, max_y );
document.body.appendChild( renderer.domElement );
//adds item to body. Probably belongs in render library.

console.log("[Control.IO] Loaded client module.")

//all post-setup actions below here
var game = new Game();
