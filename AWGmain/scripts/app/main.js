function makeTick(units, tick) {
    if (tick % 10 == 0) {
        for (var i = 0; i < 5; i++) {
            var curTask = units[i].tasks[units[i].tasks.length - 1];
            //console.log(curTask!=null && curTask.type == 'move');
            if (curTask != null && curTask.type == 'move') {
                if (goToDesiredPosstition(units[i])) {
                    units[i].tasks.pop();
                }
            }

        }

    }
}

function createWarrior() {
    var sprite = PIXI.Sprite.fromImage('resource/art/warrior_stand.png');

    sprite.interactive = true;
    sprite.scale.x = 0.3;
    sprite.scale.y = 0.3;
    sprite.x = 40 + getRandom();
    sprite.y = 40 + getRandom();

    var warrior = {sprite: sprite}

    warrior.destinationX = 400;
    warrior.destinationY = 200;
    warrior.tasks = new Array();

    warrior.tasks.push(createMoveTask(200, 200));

    warrior.move = function (x, y) {
        this.destinationX = x;
        this.destinationY = y;
    }
    return warrior;
}


function getRandom() {
    var min = 1;
    var max = 600;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//return true wheb u get the destination
function goToDesiredPosstition(unit) {
    var r = 3; //speed
    var dx = unit.destinationX - unit.sprite.x;
    var dy = unit.destinationY - unit.sprite.y;

    if (Math.abs(dx) >= r) {
        unit.sprite.x += r * (dx) / Math.sqrt(Math.pow(dy, 2) + Math.pow(dx, 2));
    }
    if (Math.abs(dy) >= r) {
        unit.sprite.y += r * (dy) / Math.sqrt(Math.pow(dy, 2) + Math.pow(dx, 2));
    }

    if (Math.abs(dy) < r || Math.abs(dx) < r) {
        return true;
    } else {
        return false;
    }

}

function f() {
    var borderX = 800;
    var borderY = 600;
    var i = 1;
    var newx = units[i].x + getRandomBetween(-3, 3);
    var newy = units[i].y + getRandomBetween(-3, 3);

    if (newx < borderX && newx > 1) {
        units[i].x = newx;
    }
    if (newy < borderY && newy > 1) {
        units[i].y = newy;
    }
}

function createMoveTask(toX, toY) {
    return task = {
        type: "move",
        x: toX,
        y: toY
    }


}
function createKillTask(targetID) {
    return task = {
        type: "kill",
        target: targetID
    }
}