define(['pixi.min', 'app/utils', 'app/ui/textRender', 'app/ui/animationRender'], function (pixi, Utils, TextRender, AnimationRender) {
    var createWarrior = function (n) {
        var Actions = {
            IDLE: 'idle',
            WALK: 'walk',
            ATTACK: 'attack',
            DEAD: 'dead'
        }

        var container = new PIXI.Container();
        container.x = 40 + Utils.getRandom();
        container.y = 40 + Utils.getRandom();

        var sprite = PIXI.Sprite.fromImage('resource/art/warrior_stand.png');
        sprite.interactive = true;
        sprite.scale.x = 0.3;
        sprite.scale.y = 0.3;

        container.addChild(sprite);
        var number = n;// Utils.getRandomBetween(100, 200);
        container.addChild(TextRender.getNick('w' + number));
        container.animations = {
            timer: 0
        };
        var warrior = {cont: container};
        warrior.id = "w" + number;
        warrior.curAction = Actions.IDLE;
        warrior.stats = {
            hp: 100,
            mp: 100,
            ms: 3,
            atk: {
                dmg: 10,
                cd: 0,
                atkSpeed: 10,
                range: 5
            }
        };

        warrior.tasks = new Array();

        //!! remove
        if (n == 4) {
            n = 0;
        }
        warrior.tasks.push(createMoveTask(Utils.getRandom(), Utils.getRandom()));
        warrior.tasks.push(createKillTask('w' + (n + 1)));

        //return true if unit die
        warrior.makeDamage = function (dmg) {
            warrior.stats.hp -= dmg;
            if (warrior.stats.hp <= 0) {
                warrior.curAction = Actions.DEAD;
                warrior.death();
                return true;
            }
            return false;
        }

        //return: true if attack is finished
        var attack = function (target) {
            if (warrior.stats.atk.cd == 0) {
                if (AnimationRender.unitAttack(warrior.cont)) { //animation finished
                    target.makeDamage(warrior.stats.atk.dmg + Utils.getRandomBetween(-2, 2));
                    warrior.stats.atk.cd = warrior.stats.atk.atkSpeed;
                    return true;
                }
            } else {
                warrior.stats.atk.cd--;
            }
            return false;
        };

        warrior.death = function () {
            console.log(warrior.id + " death");
            AnimationRender.unitDeath(warrior.cont);
            warrior.curAction = Actions.DEAD;
        };


        warrior.isDead = function () {
            return warrior.stats.hp <= 0;
        };

        //return true when u get the destination
        warrior.goToDesiredPosition = function () {
            var s = 3; //speed
            var movetask = warrior.tasks[warrior.tasks.length - 1];
            var range = goToPoint(warrior, movetask.x, movetask.y, s)
            if (range < s) {
                warrior.curAction = Actions.IDLE;
                return true;
            } else {
                warrior.curAction = Actions.WALK;
                return false;
            }

        };

        //return true if unit have been attacked and animation finished
        warrior.attackUnit = function attackUnit(units, targetID) {
            var targetUnit = units[targetID];
            var range;
            if (warrior.curAction == Actions.WALK || warrior.curAction == Actions.IDLE) {
                range = goToPoint(warrior, targetUnit.cont.x, targetUnit.cont.y, warrior.stats.ms);
                if (range <= warrior.stats.atk.range) {
                    // if target close enough
                    warrior.curAction = Actions.ATTACK;
                }
            }
            if (warrior.curAction == Actions.ATTACK) {
                var attackFinished = attack(targetUnit);
                if (attackFinished) {
                    warrior.curAction = Actions.IDLE;
                    return true;
                }
            }

            return false;
        };

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


        return warrior;
    };


    return {createWarrior: createWarrior}


});