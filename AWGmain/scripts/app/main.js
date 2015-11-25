function makeTick(units, tick) {
    if (tick % 10 == 0) {
        for (var i = 0; i < 5; i++) {
            goToDesiredPosstition(units[i]);
        }

    }
}

function createWarrior() {
    var warrior = PIXI.Sprite.fromImage('resource/art/warrior_stand.png');
    warrior.interactive = true;
    warrior.scale.x = 0.3;
    warrior.scale.y = 0.3;
    warrior.on('mousedown', onUnitDown);
    warrior.on('touchstart', onUnitDown);
    warrior.x = 40 + getRandom();
    warrior.y = 40 + getRandom();

    warrior.destinationX = 400;
    warrior.destinationY = 400;

    warrior.move = function (x, y) {
        this.destinationX = x;
        this.destinationY = y;
    }
    return warrior;
}

function onUnitDown(eventData) {
    this.x += getRandomBetween(-10, 10);//  getRandom(-1,100);
    this.y += getRandomBetween(-10, 10);//  getRandom(-1,100);
}

function getRandom() {
    var min = 1;
    var max = 600;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function goToDesiredPosstition(unit) {
    var r = 5; //speed
    if (Math.abs(unit.destinationX - unit.x) >= r) {
        unit.x += r * (unit.destinationY - unit.y) / Math.sqrt(Math.pow((unit.destinationY - unit.y), 2) + Math.pow((unit.destinationX - unit.x), 2));
    }
    if (Math.abs(unit.destinationY - unit.y) >= r) {
        unit.y += r * (unit.destinationX - unit.x) / Math.sqrt(Math.pow((unit.destinationY - unit.y), 2) + Math.pow((unit.destinationX - unit.x), 2));
    }

    return true;
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