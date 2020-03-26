class Game {

    constructor() {
        this.map = []
        // this.gamemap = new GameMap({width: window.innerWidth, height: window.innerHeight});
        this.settings = {width: window.innerWidth, height: window.innerHeight};
    }

    claimSpace(array) {
        var x = 0;
        while (x < array.length) {

            if ((x + 1) < array.length) {
                console.log("Line from " + array[x] + " to " + array[x+1])
            } else {
                console.log("Line from " + array[x] + " to " + array[0])
            }
            x++;
        }
    }
}

// class GameMap {
//     constructor(settings) {
//         this.settings = settings;
//         // console.log(settings);
//         this.map[1][2] = 
//     }
// }