function Game() {
    console.log("[Control.IO] Starting game instance...");
    init();

    var gameLobby;
    var gameWindow;

    var gameStatus;

    function init() {
        window.addEventListener('gamepadconnected', controllerConnectedEvent);
        window.addEventListener('gamepaddisconnected', controllerDisconnectedEvent);
        window.addEventListener('keyup', keyUp);

        // window.addEventListener("MozGamepadButtonDown", function(evt) { buttonPressed(evt, true); } );
        // window.addEventListener("MozGamepadButtonUp", function(evt) { buttonPressed(evt, false); } );

        //if singleplayer selected
        runLocalPlayer();

        //if multiplayer selected
        //totally optional
    };

    function runLocalPlayer() {
        console.log("Starting a local session...")
        gameLobby = new GameLobby(this,"Starting Local Session...");
        gameStatus = "singleplayer-lobby"
        var gameLobbyResult = gameLobby.show();
        if (gameLobbyResult) {
            gameStatus = "singleplayer-startgame";
            //start game countdown
            //start game
            //create start game timer
            gameWindow = new GameWindow();
            initMap();

            addPlayers();

            runAnimation(this);
        }
        
        //end game screen
    }

    function runMultiPlayer() {
        console.log("Joining a multiplayer session...");
    }

    function initMap() {
        console.log("Initializing map...")
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

    /**
     * addPlayers
     *
     * Adds players to the game
     */
    function addPlayers() {
        players.push(new Player(gameWindow, "#4d88d5", "Player 1", {up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight", abutton: "KeyZ", bbutton: "ShiftLeft"}));
        players.push(new Player(gameWindow, "#ff0000", "Player 2", {up: "KeyW", down: "KeyS", left: "KeyA", right: "KeyD"}));
        players.push(new Player(gameWindow, "#009933", "Player 3", {up: "KeyI", down: "KeyK", left: "KeyJ", right: "KeyL", abutton: "KeyY", bbutton: "KeyU"}));
        players.push(new Player(gameWindow, "#ffff00", "Player 4", {up: "KeyG", down: "KeyB", left: "KeyV", right: "KeyN"}));
        
        players.forEach(function (player) {
            gameWindow.scene.add(player.getPlayerObject());
        });
    }

    function updatePos() {
        players.forEach(function (player) {
            player.updatePos();
        });
    }

    /**
     * runAnimation
     *
     * Starts the animation sequence. Methods within are called on each frame.
     */
    function runAnimation() {
        requestAnimationFrame(runAnimation);

        updatePos();

        gameWindow.renderer.render(gameWindow.scene, gameWindow.camera);
    }

    //Literally from https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
    /**
     * controllerConnectedEvent
     * Detects when a gamepad is connected and announces it.
     */
    // const gamepad = new Gamepad();

    // gamepad.on('connect', e => {
    //     console.log(`controller ${e.index} connected!`);
    // });

    // gamepad.on('disconnect', e => {
    //     console.log(`controller ${e.index} disconnected!`);
    // });

    function controllerConnectedEvent(event) {
        // console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        // event.gamepad.index, event.gamepad.id,
        // event.gamepad.buttons.length, event.gamepad.axes.length);
        //imagine spawning a player when they connect a gamepad though. Could make for a cool feature.

        if (gameStatus == "singleplayer-lobby") {
            gameLobby.controllerJoin(event);
        } else {
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
        }
    };

    function controllerDisconnectedEvent(event) {
        if (gameStatus == "singleplayer-lobby") {
            gameLobby.controllerLeave(event);
        } else {
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
    }

    function keyUp(event) {
        if (gameStatus == "singleplayer-lobby") {
            if (event.code == "Space") {
                gameLobby.joinLeaveKeyboard();
            }
        }
    }
    
}

console.log("[Control.IO] Loaded game module.")
