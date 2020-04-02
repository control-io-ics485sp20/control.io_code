function GameLobby(game, roomName) {
    var roomName = roomName;
    var game = game;
    var controllers = {};
    i = {}
    // }
    // }

    // this.l

    function show() {
        var html = `
        <div id="gamelobby">
            <div id="gamelobby-gamename">` + gameName + `</div>        
            <div id="gamelobby-roomname">` + roomName + `</div>
            <div id="gamelobby-playerlist">
                <div class="gamelobby-playercard">` + lobbyJoinInstructionMessage + `</div>
            </div>        
        </div>
        `

        $("#window").append(html);

        checkControllers();
    }

    function controllerJoin(event) {
        let id = event.gamepad.id + event.gamepad.index;

        // if ($("#" + id).length) {
        if (controllers[id] != null) {
            //controller already connected
        } else {
            console.log("Controller " + id + " connected!");
            $("#gamelobby-playerlist").append(`<div id="` + id + `" class="gamelobby-playercard">` + lobbyJoinControllerInstructionMessage + `</div>`);
            controllers[id] = {};
            controllers[id]["gamepad"] = event.gamepad;
            i[id] = {}
        }
    }

    function controllerLeave(event) {
        let id = event.gamepad.id + event.gamepad.index;
        console.log("Controller " + id + " disconnected!");
        $("#" + id).remove();
        delete controllers[id];
    }

    function controllerLock(id) {
        if (controllers[id]["player"] == null) {
            controllers[id]["player"] = {};
            controllers[id]["player"]["name"] = generateName();

            $("#" + id).html(`<div class="gamelobby-playercard-playername">` + controllers[id]["player"]["name"] + `</div>`);
        } else {

            $("#" + id).html(lobbyJoinControllerInstructionMessage);

            delete controllers[id]["player"];
        }
    }

    function keyboardLock(id) {
        if (controllers[id] == null) {
            controllers[id] = {};
            controllers[id]["player"] = {};
            controllers[id]["player"]["name"] = generateName();

            $("#gamelobby-playerlist").append(`<div id="` + id + `" class="gamelobby-playercard"></div>`);
            $("#" + id).html(`<div class="gamelobby-playercard-playername">` + controllers[id]["player"]["name"] + `</div>`);
        } else {

            $("#" + id).remove();

            delete controllers[id];
        }
    }

    function generateName() {
        var takenNames = [];
        Object.keys(controllers).forEach(function (id) {
            if (controllers[id] != null && controllers[id]["player"] != null && controllers[id]["player"]["name"] != null) {
                takenNames.push(controllers[id]["player"]["name"]);
            }
        });

        var iterator = 1;
        var taken = true;
        var currName;
        while(taken) {
            currName = ("Player " + iterator);
            if (takenNames.includes(currName)) {
                iterator++;
            } else {
                taken = false;
            }
        }
        return currName;
    }

    function joinLeaveKeyboard() {
        keyboardLock("keyboard1");
    }

    function checkControllers() {
        requestAnimationFrame(checkControllers);
    
        Object.keys(controllers).forEach(function (id) {
            if (controllers[id] != null && controllers[id]["gamepad"] != null) {
                if (controllers[id]["gamepad"].buttons[9].value > 0 || controllers[id]["gamepad"].buttons[9].pressed == true) {
                    i[id]["start_pressed"] = true;
                } else {
                    if (i[id]["start_pressed"] == true) {
                        controllerLock(id);
                        i[id]["start_pressed"] = false;
                    }
        
                }
            }
        });
    }
    
    return {
        show: show,
        controllerJoin: controllerJoin,
        controllerLeave: controllerLeave,
        joinLeaveKeyboard : joinLeaveKeyboard
    }
}