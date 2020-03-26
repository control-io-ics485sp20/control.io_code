/**
 * Player
 *
 * Class that represents a Player
 */
class Player {
    constructor(color, name, keybinds) {
        this.coordsArray = [];
        this.coordsArrayPointList = [];
        this.linesArray = [];
        this.claimedShapesArray = [];

        this.name = name;

        this.color = {
            normal: color,
            bright: tinycolor(color).brighten(25).toString(),
            dark: tinycolor(color).darken(25).toString()
        };

        // console.log(color.toString());
        // console.log(tinycolor(color).brighten(25).toString());

        this.prevLJ_X = 0;
        this.prevLJ_Y = 0;
        this.prevRJ_X = 0;
        this.prevRJ_Y = 0;

        this.keybinds = keybinds;

        this.geometry = new THREE.RingGeometry(player_radius, (player_radius + .03), 32);
        this.material = new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.DoubleSide
        });
        this.player_object = new THREE.Mesh(this.geometry, this.material);

        // this.geometry = new THREE.CircleGeometry(player_radius, 32);
        // this.material = new THREE.MeshBasicMaterial({
        //     color: color
        // });
        // this.player_object = new THREE.Mesh(this.geometry, this.material);

        this.randomSpawn();
        this.addNewCoord();

        this.guidingLine = new GuidingLine(this.coordsArray[0].x, this.coordsArray[0].y, this.player_object.position.x, this.player_object.position.y, this.color.normal);
    };

    randomSpawn() {
        var random_x = Math.floor(((Math.random() * Math.floor(max_x * 2)) - max_x))/canvas_multiplier;
        var random_y = Math.floor(((Math.random() * Math.floor(max_y * 2)) - max_y))/canvas_multiplier;
        // var random_x = Math.floor(((Math.random() * Math.floor(max_x)) - max_x));
        // var random_y = Math.floor(((Math.random() * Math.floor(max_y)) - max_y));
        this.player_object.position.x = random_x;
        this.player_object.position.y = random_y;
    }

    getPlayerObject () {
        return this.player_object;
    };

    moveUp () {
        this.player_object.position.y += player_max_velocity;
    }

    moveDown () {
        this.player_object.position.y -= player_max_velocity;
    }

    moveLeft () {
        this.player_object.position.x -= player_max_velocity;
    }

    moveRight () {
        this.player_object.position.x += player_max_velocity;
    }

    /*
        * moveX
        *
        * Intended for controllers.
        * Given a float modifier value, updates the player's position on the X axis for a frame.
        */
    moveX (modifier) {
        var player_x = this.player_object.position.x + (player_max_velocity * modifier);
        this.player_object.position.x = player_x;
        
        // updates the guidingLine to the player's current position
        this.guidingLine.guidingLineObject.geometry.vertices[1].x = player_x;
        this.guidingLine.guidingLineObject.geometry.verticesNeedUpdate = true;
        //TODO Constrain x axes movement to area
    }

    /*
        * moveY
        *
        * Intended for controllers.
        * Given a float modifier value, updates the player's position on the Y axis for a frame.
        */
    moveY (modifier) {
        var player_y = this.player_object.position.y + (player_max_velocity * modifier);
        this.player_object.position.y = player_y;
        
        // updates the guidingLine to the player's current position
        this.guidingLine.guidingLineObject.geometry.vertices[1].y = player_y;
        this.guidingLine.guidingLineObject.geometry.verticesNeedUpdate = true;
        //TODO Constrain y axes movement to area
    }

    addNewCoord() {
        if (this.coordsArray == undefined || this.coordsArray.length == 0) {
            //add point
            this.coordsArrayPointList.push([this.player_object.position.x, this.player_object.position.y]);

            //draw point
            this.coordsArray.push(new Coordinate(this.player_object.position.x, this.player_object.position.y, this.color.normal));
        } else {
            var thisPoint = [this.player_object.position.x, this.player_object.position.y];
            var lastPoint = this.coordsArrayPointList[this.coordsArray.length - 1];

            if ((thisPoint != lastPoint) && (!this.anyLinesIntersect(thisPoint, lastPoint))) {
                var lastCoord = this.coordsArray[this.coordsArray.length - 1];

                //add point
                this.coordsArrayPointList.push([this.player_object.position.x, this.player_object.position.y]);

                //draw point
                this.coordsArray.push(new Coordinate(this.player_object.position.x, this.player_object.position.y, this.color.normal));
                //draw line
                this.linesArray.push(new CoordinateLine(this.player_object.position.x, this.player_object.position.y, lastCoord.x, lastCoord.y, this.color.normal));
                
                this.guidingLine.guidingLineObject.geometry.vertices[0].x = this.player_object.position.x;
                this.guidingLine.guidingLineObject.geometry.vertices[0].y = this.player_object.position.y;
            }
        }
    }

    //checks if any of the lines intersect
    anyLinesIntersect(l1p1, l1p2) {
        var x = 0;
        while (x < this.coordsArrayPointList.length) {
            if ((x + 1) < this.coordsArrayPointList.length) { //if not the last point
                // console.log(this.coordsArrayPointList[x], this.coordsArrayPointList[x+1])
                var l2p1 = this.coordsArrayPointList[x];
                var l2p2 = this.coordsArrayPointList[x+1];
                if(this.linesIntersect(l1p1, l1p2, l2p1, l2p2)) {
                    return true;
                }
            }
            x++;
        }
        return false;
    }

    //http://jeffreythompson.org/collision-detection/line-line.php
    //checks if two lines intersect
    linesIntersect(l1p1, l1p2, l2p1, l2p2) {
        //line 1 coords
        var x1 = l1p1[0];
        var y1 = l1p1[1];
        var x2 = l1p2[0];
        var y2 = l1p2[1];

        //line 1 coords
        var x3 = l2p1[0];
        var y3 = l2p1[1];
        var x4 = l2p2[0];
        var y4 = l2p2[1];

        // calculate the distance to intersection point
        var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
        var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
      
        // if uA and uB are between 0-1, lines are colliding
        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
            var intersectionX = x1 + (uA * (x2-x1));
            var intersectionY = y1 + (uA * (y2-y1));

            var iPoint = [intersectionX, intersectionY]

            // var intersect_is_l1p1 = (intersectionX == x1) && (intersectionY == y1);
            // var intersect_is_l1p2 = (intersectionX == x2) && (intersectionY == y2);
            // var intersect_is_l2p1 = (intersectionX == x3) && (intersectionY == y3);
            // var intersect_is_l2p2 = (intersectionX == x4) && (intersectionY == y4);

            var intersect_is_l1p1 = JSON.stringify(iPoint) == JSON.stringify(l1p1);
            var intersect_is_l1p2 = JSON.stringify(iPoint) == JSON.stringify(l1p2);
            var intersect_is_l2p1 = JSON.stringify(iPoint) == JSON.stringify(l2p1);
            var intersect_is_l2p2 = JSON.stringify(iPoint) == JSON.stringify(l2p2);

            //if the intersection is not the endpoints
            // if(!(!(l1p1_intersects) &&
            // !(l1p2_intersects) &&
            // !(l2p1_intersects) &&
            // !(l2p2_intersects))
            // ) {

            if(!intersect_is_l1p1 && !intersect_is_l1p2 && !intersect_is_l2p1 && !intersect_is_l2p2) {
                console.log(JSON.stringify(iPoint) + " is not " + JSON.stringify(l1p1))
                console.log(JSON.stringify(iPoint) + " is not " + JSON.stringify(l1p2))
                console.log(JSON.stringify(iPoint) + " is not " + JSON.stringify(l2p1))
                console.log(JSON.stringify(iPoint) + " is not " + JSON.stringify(l2p2))

                console.log(l1p1, l1p2, l2p1, l2p2);
                console.log(intersect_is_l1p1,intersect_is_l1p2,intersect_is_l2p1,intersect_is_l2p2);
                console.log(intersectionX,intersectionY);
                console.log("Found an intersecting line.")

                return true;
            }
        }
        return false;
    }

    setPoly() {
        if (this.coordsArray.length > 1) {
            this.addNewCoord();

            this.claimedShapesArray.push(new Polygon(this.coordsArray, this.color.dark));
            window.game.claimSpace(this.coordsArrayPointList);
            // console.log(this.coordsArrayList);

            //remove drawings
            while (this.coordsArray.length > 0) {
                var n = this.coordsArray.pop();
                scene.remove(n.coordObject);
            }
            while (this.linesArray.length > 0) {
                var n = this.linesArray.pop();
                scene.remove(n.coordLineObject);
            }

            //clear coordinates
            this.coordsArrayPointList = []

            //add a starting coordinate
            this.addNewCoord();
        }
    }

    updatePos () {
        if (this.gamepad == undefined) {
            if (this.UpPressed) {
                this.moveUp();
            }
            if (this.DownPressed) {
                this.moveDown();
            }
            if (this.LeftPressed) {
                this.moveLeft();
            }
            if (this.RightPressed) {
                this.moveRight();
            }
        } else {
            if (this.ALocked == false && this.gamepad.buttons[0].pressed) {
                this.addNewCoord();
                this.ALocked = true;
            } else if (!this.gamepad.buttons[0].pressed) {
                this.ALocked = false;
            }

            if (this.BLocked == false && this.gamepad.buttons[1].pressed) {
                this.setPoly();
                this.BLocked = true;
            } else if (!this.gamepad.buttons[1].pressed) {
                this.BLocked = false;
            }

            this.currLJ_X = refineAxisValue(this.gamepad.axes[0]);
            this.currLJ_Y = refineAxisValue(this.gamepad.axes[1]);
            if (!(this.prevLJ_X == this.currLJ_X)) {
                this.prevLJ_X = this.currLJ_X;
            }
            if (!(this.prevLJ_Y == this.currLJ_Y)) {
                this.prevLJ_Y = this.currLJ_Y;
            }

            this.currRJ_X = refineAxisValue(this.gamepad.axes[2]);
            this.currRJ_Y = refineAxisValue(this.gamepad.axes[3]);
            if (!(this.prevRJ_X == this.currRJ_X)) {
                this.prevRJ_X = this.currRJ_X;
            }
            if (!(this.prevRJ_Y == this.currRJ_Y)) {
                this.prevRJ_Y = this.currRJ_Y;
            }

            this.moveY(-this.currLJ_Y);
            this.moveX(this.currLJ_X);
        }
    }

    keyDown (e) {
        switch(e.code) {
            case this.keybinds.abutton:
                if (!this.ALocked) {
                    this.addNewCoord();
                    this.ALocked = true;
                }
                break;
            case this.keybinds.bbutton:
                if (!this.BLocked) {
                    this.setPoly();
                    this.BLocked = true;
                }
                break;
            case this.keybinds.up:
                this.UpPressed = true;
                break;
            case this.keybinds.down:
                this.DownPressed = true;
                break;
            case this.keybinds.left:
                this.LeftPressed = true;
                break;
            case this.keybinds.right:
                this.RightPressed = true;
                break;
            default:
                break;
        }
    }

    keyUp (e) {
        switch(e.code) {
            case this.keybinds.abutton:
                this.ALocked = false;
                break;
            case this.keybinds.bbutton:
                this.BLocked = false;
                break;
            case this.keybinds.up:
                this.UpPressed = false;
                break;
            case this.keybinds.down:
                this.DownPressed = false;
                break;
            case this.keybinds.left:
                this.LeftPressed = false;
                break;
            case this.keybinds.right:
                this.RightPressed = false;
                break;
            default:
                break;
        }
    }
};