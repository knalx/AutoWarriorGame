define(['pixi.min', 'app/utils', 'app/task', 'app/heroes/warrior'],
    function (pixi, Utils, Task, Warrior) {
        //periodic timing process
        var makeTick = function (units, tick) {
            var keys = Utils.getKeys(units);
            keys.forEach(function (key) {
                var curTask = units[key].tasks[units[key].tasks.length - 1];
                if (curTask != null && units[key].stats.hp > 0) {
                    if (curTask.type == 'move') {
                        if (goToDesiredPosstition(units[key])) {
                            units[key].tasks.pop();
                        }
                    }
                    if (curTask.type == 'kill') {
                        if (killUnit(units, key)) {
                            units[key].tasks.pop();
                        }
                    }
                } else if (curTask == null && units[key].stats.hp > 0) {
                    console.log('op');
                    units[key].tasks.push(createMoveTask(Utils.getRandom(), Utils.getRandom()));
                }
            });


        };


        var initHeroes = function () {
            var heroes = {};
            for (var j = 0; j < 5; j++) {
                var warrior = Warrior.createWarrior(j);
                heroes[warrior.id] = warrior;
            }

            return heroes;
        }


//return true when u get the destination
        function goToDesiredPosstition(unit) {
            var s = 3; //speed
            var movetask = unit.tasks[unit.tasks.length - 1];
            var range = goToPoint(unit, movetask.x, movetask.y, s)
            return range < s;
        }

        //return range between unit and destination
        function goToPoint(unit, toX, toY, r) {
            var dx = toX - unit.cont.x;
            var dy = toY - unit.cont.y;

            if (Math.abs(dx) >= r) {
                unit.cont.x += r * (dx) / Math.sqrt(Math.pow(dy, 2) + Math.pow(dx, 2));
            }
            if (Math.abs(dy) >= r) {
                unit.cont.y += r * (dy) / Math.sqrt(Math.pow(dy, 2) + Math.pow(dx, 2));
            }

            return Math.sqrt(Math.sqrt(Math.pow(dy, 2) + Math.pow(dx, 2)));
        }

        //unit with key have last task to kill somebody
        function killUnit(units, key) {
            var speed = 3;
            var unit = units[key];
            var killTask = unit.tasks[unit.tasks.length - 1];
            var targetUnit = units[killTask.target];
            // if target close enough
            var range = goToPoint(unit, targetUnit.cont.x, targetUnit.cont.y, speed);
            if (range <= 3) {
                return unit.attack(units[killTask.target]);
            }
            return false;
        }


        return {
            makeTick: makeTick,
            initHeroes: initHeroes
        };
    });