define(['pixi.min', 'app/utils', 'app/units/heroes/warrior', 'app/task', 'app/enums', 'app/units/mobs/mob'],
    function (pixi, Utils, Warrior, Task, Enums, Mob) {
        //periodic timing process
        var makeTick = function (units, mobs, tick) {
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
                    //console.log('op');
                    keys.forEach(function (key) {
                        if (key != unitID && units[key].curAction != Actions.DEAD) {
                            units[unitID].tasks.push(createKillTask(key));
                        }
                    });
                    units[unitID].tasks.push(createMoveTask(Utils.getRandom(), Utils.getRandom()));
                }
            });

            var mobKeys = Utils.getKeys(mobs);
            mobKeys.forEach(function (unitID) {
                var curTask = mobs[unitID].tasks[mobs[unitID].tasks.length - 1];
                if (curTask != null && mobs[unitID].stats.hp > 0) {
                    //move
                    if (curTask.type == 'move') {
                        if (mobs[unitID].goToDesiredPosition()) {
                            mobs[unitID].tasks.pop();
                        }
                    }
                    //attack
                    if (curTask.type == 'attack') {
                        if (mobs[unitID].attackUnit(mobs, curTask.target)) {
                            mobs[unitID].tasks.pop();
                        }
                    }
                    //kill
                    if (curTask.type == 'kill') {
                        if (units[curTask.target].isDead()) {
                            mobs[unitID].tasks.pop();
                        } else {
                            mobs[unitID].tasks.push(createAttackTask(curTask.target));
                        }
                    }

                } else if (curTask == null && mobs[unitID].stats.hp > 0) {
                    //console.log('op');
                    keys.forEach(function (key) {
                        if (key != unitID && mobs[key].curAction != Actions.DEAD) {
                            mobs[unitID].tasks.push(createKillTask(key));
                        }
                    });
                    mobs[unitID].tasks.push(createMoveTask(Utils.getRandom(), Utils.getRandom()));
                }
            });


        };

        var initHeroes = function (units) {
            for (var j = 0; j < 5; j++) {
                var warrior = Warrior.createWarrior(j);
                units[warrior.id] = warrior;
            }

            return units;
        };

        var initMobs = function (units) {
            for (var j = 0; j < 5; j++) {
                var mob = Mob.createMob(j);
                units[mob.id] = mob;
            }

            return units;
        };

        return {
            makeTick: makeTick,
            initHeroes: initHeroes,
            initMobs: initMobs
        };
    });