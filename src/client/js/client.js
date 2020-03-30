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

class Gamepad {

}

var zoom_percent = 100;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( zoom_percent, max_x / max_y, 1, 1000 );
// var camera = new THREE.OrthographicCamera( max_x / - 2, max_x / 2, max_y / 2, max_y / - 2, max_x, max_y );
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( max_x, max_y );
document.body.appendChild( renderer.domElement );

//detect gamepad connection
window.addEventListener('gamepadconnected', controllerConnectedEvent);
window.addEventListener('gamepaddisconnected', controllerDisconnectedEvent);

//detect keyboard control input
window.addEventListener('keydown', keyDownEvent);
window.addEventListener('keyup', keyUpEvent);

//Literally from https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
/**
 * controllerConnectedEvent
 * Detects when a gamepad is connected and announces it.
 */
function controllerConnectedEvent(event) {
    // console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    // event.gamepad.index, event.gamepad.id,
    // event.gamepad.buttons.length, event.gamepad.axes.length);
    //imagine spawning a player when they connect a gamepad though. Could make for a cool feature.

    var i = 0;
    while(i < players.length) {
        if (players[i].gamepad == undefined) {
            players[i].gamepad = event.gamepad;
            console.log("Gamepad connected and assigned to %s with index %d: %s. %d buttons, %d axes.",
                players[i].name, event.gamepad.index, event.gamepad.id, event.gamepad.buttons.length, event.gamepad.axes.length);
            break;
        }
        i++;
    }
};

function controllerDisconnectedEvent(event) {
    var i = 0;
    while(i < players.length) {
        if (players[i].gamepad == event.gamepad) {
            players[i].gamepad = undefined;
            console.log("Gamepad disconnected from %s with index %d: %s. %d buttons, %d axes.",
                players[i].name, event.gamepad.index, event.gamepad.id, event.gamepad.buttons.length, event.gamepad.axes.length);
            break;
        }
        i++;
    }
}

function keyDownEvent(event) {
    players.forEach(function (player) {
        player.keyDown(event);
    });
}

function keyUpEvent(event) {
    players.forEach(function (player) {
        player.keyUp(event);
    });
}

function updatePos() {
    players.forEach(function (player) {
        player.updatePos();
    });
}

/**
 * animate
 *
 * Starts the animation sequence. Methods within are called on each frame.
 */
function runAnimation() {
    requestAnimationFrame(runAnimation);

    updatePos();
    // gamepad_detect();

    renderer.render(scene, camera);
}

//TODO assign a gamepad to a Player
function gamepad_detect() {
    //TODO for each person, get the assigned gamepad
    if (navigator.getGamepads) {
        var gp = navigator.getGamepads()[0];

        if (gp != undefined) {
            if (debug) {
                if (gp.buttons[0].value > 0 || gp.buttons[0].pressed == true) {
                    console.log("AButton pressed.");
                }
                if (gp.buttons[1].value > 0 || gp.buttons[1].pressed == true) {
                    console.log("BButton pressed.");
                }
                if (gp.buttons[2].value > 0 || gp.buttons[2].pressed == true) {
                    console.log("XButton pressed.");
                }
                if (gp.buttons[3].value > 0 || gp.buttons[3].pressed == true) {
                    console.log("YButton pressed.");
                }
                if (gp.buttons[4].value > 0 || gp.buttons[4].pressed == true) {
                    console.log("LButton pressed.");
                }
                if (gp.buttons[5].value > 0 || gp.buttons[5].pressed == true) {
                    console.log("RButton pressed.");
                }
                if (gp.buttons[6].value > 0 || gp.buttons[6].pressed == true) {
                    console.log("LTrigger pressed.");
                }
                if (gp.buttons[7].value > 0 || gp.buttons[7].pressed == true) {
                    console.log("RTrigger pressed.");
                }
                if (gp.buttons[8].value > 0 || gp.buttons[8].pressed == true) {
                    console.log("BackButton pressed.");
                }
                if (gp.buttons[9].value > 0 || gp.buttons[9].pressed == true) {
                    console.log("StartButton pressed.");
                }
                if (gp.buttons[10].value > 0 || gp.buttons[10].pressed == true) {
                    console.log("LeftJoystickButton pressed.");
                }
                if (gp.buttons[11].value > 0 || gp.buttons[11].pressed == true) {
                    console.log("RightJoystickButton pressed.");
                }
                if (gp.buttons[12].value > 0 || gp.buttons[12].pressed == true) {
                    console.log("Up pressed.");
                }
                if (gp.buttons[13].value > 0 || gp.buttons[13].pressed == true) {
                    console.log("Down pressed.");
                }
                if (gp.buttons[14].value > 0 || gp.buttons[14].pressed == true) {
                    console.log("Left pressed.");
                }
                if (gp.buttons[15].value > 0 || gp.buttons[15].pressed == true) {
                    console.log("Right pressed.");
                }
                if (gp.buttons[16].value > 0 || gp.buttons[16].pressed == true) {
                    console.log("5 pressed.");
                }
            }

            //TODO move to Player class
            var currLJ_X = refineAxisValue(gp.axes[0]);
            var currLJ_Y = refineAxisValue(gp.axes[1]);
            if (!(players[0].prevLJ_X == currLJ_X)) {
                players[0].prevLJ_X = currLJ_X;
            }
            if (!(players[0].prevLJ_Y == currLJ_Y)) {
                players[0].prevLJ_Y = currLJ_Y;
            }

            var currRJ_X = refineAxisValue(gp.axes[2]);
            var currRJ_Y = refineAxisValue(gp.axes[3]);
            if (!(players[0].prevRJ_X == currRJ_X)) {
                players[0].prevRJ_X = currRJ_X;
            }
            if (!(players[0].prevRJ_Y == currRJ_Y)) {
                players[0].prevRJ_Y = currRJ_Y;
            }

            players[0].moveY(-currLJ_Y);
            players[0].moveX(currLJ_X);
        }
    }
}

/**
 * refineAxisValue
 *
 * Given a float value, returns a rounded float to the nearedst .00. If this
 * value is within a .05 threshold or over 1, it returns the closest whole value
 * to ensure maximum values/controller idle.
 */
function refineAxisValue(float) {
    var float_val = Math.floor(float * 100) / 100;
    if ((float_val <= 0.05) && (float_val >= -0.05)) {
        return 0;
    } else if ((float_val >= 0.95) && (float_val >= 1)) {
        return 1;
    } else if ((float_val <= -0.95) && (float_val <= -1)) {
        return -1;
    } else {
        return float_val;
    }
}

/**
 * init
 *
 * Initializes the game.
 */
function init() {
    initMap();

    addPlayers();
};

/**
 * addPlayers
 *
 * Adds players to the game
 */
function addPlayers() {
    players.push(new Player("#4d88d5", "Player 1", {up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight", abutton: "KeyZ", bbutton: "ShiftLeft"}));
    players.push(new Player("#ff0000", "Player 2", {up: "KeyW", down: "KeyS", left: "KeyA", right: "KeyD"}));
    players.push(new Player("#009933", "Player 3", {up: "KeyI", down: "KeyK", left: "KeyJ", right: "KeyL", abutton: "KeyY", bbutton: "KeyU"}));
    players.push(new Player("#ffff00", "Player 4", {up: "KeyG", down: "KeyB", left: "KeyV", right: "KeyN"}));
    
    players.forEach(function (player) {
        scene.add(player.getPlayerObject());
    });
}

function initMap() {
    // console.log(window.innerWidth);
    // console.log(window.innerHeight);

    var map = new GameMap({width: window.innerWidth, height: window.innerHeight});

    // var img = new SimpleImage(200,200);
    // print(img);

    // for (var pixel of img.values()) {
    //     pixel.setRed(255);
    //     pixel.setGreen(255);
    //     pixel.setBlue(0);
    // }
    // print(img);
}            
//initializes and animates the project
//run methods down here
init();
runAnimation();