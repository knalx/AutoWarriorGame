define(['pixi.min', 'app/utils', 'app/task', 'app/heroes/warrior'],
    function (pixi, Utils, Task, Warrior) {

        //periodic timing process
        var makeTick = function (units, tick) {
            //console.log(tick);
            //if (tick % 10 == 0) {
                for (var i = 0; i < 5; i++) {
                    var curTask = units[i].tasks[units[i].tasks.length - 1];
                    if (curTask != null && curTask.type == 'move') {
                        if (goToDesiredPosstition(units[i])) {
                            units[i].tasks.pop();
                        }
                    }

                }

            //}
        }

        var initHeroes = function () {
            var heroes = new Array();
            for (var j = 0; j < 5; j++) {
                var warrior = Warrior.createWarrior();
                heroes.push(warrior);
            }

            return heroes;
        }


        //return true when u get the destination
        function goToDesiredPosstition(unit) {
            var r = 3; //speed
            var dx = unit.destinationX - unit.cont.x;
            var dy = unit.destinationY - unit.cont.y;

            if (Math.abs(dx) >= r) {
                unit.cont.x += r * (dx) / Math.sqrt(Math.pow(dy, 2) + Math.pow(dx, 2));
            }
            if (Math.abs(dy) >= r) {
                unit.cont.y += r * (dy) / Math.sqrt(Math.pow(dy, 2) + Math.pow(dx, 2));
            }

            if (Math.abs(dy) < r && Math.abs(dx) < r) {
                return true;
            } else {
                return false;
            }

        }

        return {
            makeTick: makeTick,
            initHeroes: initHeroes
        };
    });