class Game {
    constructor() {
        console.log("[Control.IO] Starting game instance...");

        this.init();
    }

    /**
     * init
     *
     * Initializes the game.
     */
    init() {
        this.initMap();

        this.addPlayers();

        this.runAnimation();
    };

    initMap() {
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
    addPlayers() {
        players.push(new Player("#4d88d5", "Player 1", {up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight", abutton: "KeyZ", bbutton: "ShiftLeft"}));
        players.push(new Player("#ff0000", "Player 2", {up: "KeyW", down: "KeyS", left: "KeyA", right: "KeyD"}));
        players.push(new Player("#009933", "Player 3", {up: "KeyI", down: "KeyK", left: "KeyJ", right: "KeyL", abutton: "KeyY", bbutton: "KeyU"}));
        players.push(new Player("#ffff00", "Player 4", {up: "KeyG", down: "KeyB", left: "KeyV", right: "KeyN"}));
        
        players.forEach(function (player) {
            scene.add(player.getPlayerObject());
        });
    }

    updatePos() {
        players.forEach(function (player) {
            player.updatePos();
        });
    }
    
    /**
     * runAnimation
     *
     * Starts the animation sequence. Methods within are called on each frame.
     */
    runAnimation() {
        requestAnimationFrame(runAnimation);
    
        this.updatePos();
        // gamepad_detect();
    
        renderer.render(scene, camera);
    }
}

console.log("[Control.IO] Loaded game module.")
