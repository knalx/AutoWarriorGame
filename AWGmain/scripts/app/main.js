define(['pixi.min', 'app/utils', 'app/heroes/warrior', 'app/task'],
    function (pixi, Utils, Warrior, Task) {
        //periodic timing process
        var makeTick = function (units, tick) {
            var keys = Utils.getKeys(units);
            keys.forEach(function (unitID) {
                var curTask = units[unitID].tasks[units[unitID].tasks.length - 1];
                if (curTask != null && units[unitID].stats.hp > 0) {
                    //move
                    if (curTask.type == 'move') {
                        if (units[unitID].goToDesiredPosition()) {
                            units[unitID].tasks.pop();
                        }
                    }
                    //attack
                    if (curTask.type == 'attack') {
                        if (units[unitID].attackUnit(units, curTask.target)) {
                            units[unitID].tasks.pop();
                        }
                    }
                    //kill
                    if (curTask.type == 'kill') {
                        if (units[curTask.target].isDead()) {
                            units[unitID].tasks.pop();
                        } else {
                            units[unitID].tasks.push(createAttackTask(curTask.target));
                        }
                    }

                } else if (curTask == null && units[unitID].stats.hp > 0) {
                    console.log('op');
                    units[unitID].tasks.push(createMoveTask(Utils.getRandom(), Utils.getRandom()));
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





        return {
            makeTick: makeTick,
            initHeroes: initHeroes
        };
    });