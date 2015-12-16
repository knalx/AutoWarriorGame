define(['pixi.min', '../../enums', 'app/utils', 'app/ui/unitRender', 'app/ui/animationRender'],
    function (pixi, enums, Utils, UnitRender, AnimationRender) {
        var createMob = function (n) {

            var container = new PIXI.Container();
            container.x = 40 + Utils.getRandom();
            container.y = 40 + Utils.getRandom();
            var sprite = PIXI.Sprite.fromImage('resource/art/bear_stand.png');
            sprite.interactive = true;
            sprite.anchor.set(0.5);
            sprite.scale.x = 0.15;
            sprite.scale.y = 0.15;


            container.addChild(sprite);
            var number = n;// Utils.getRandomBetween(100, 200);
            container.addChildAt(UnitRender.getNick('w' + number), 1);
            container.addChildAt(UnitRender.getHpBar(1), 2);

            container.animations = {
                timer: 0
            };
            var mob = {cont: container};
            mob.id = "m" + number;
            mob.curAction = Actions.IDLE;
            mob.stats = {
                hp: 1000,
                maxHp: 1000,
                mp: 100,
                ms: 3,
                atk: {
                    dmg: 10,
                    cd: 0,
                    atkSpeed: 10,
                    range: 5
                }
            };

            mob.tasks = new Array();

            //!! remove
            if (n == 4) {
                n = 0;
            }
            mob.tasks.push(createMoveTask(Utils.getRandom(), Utils.getRandom()));
            mob.tasks.push(createKillTask('w' + (n + 1)));

            //return true if unit die
            mob.makeDamage = function (dmg) {
                mob.stats.hp -= dmg;
                mob.cont.removeChildAt(2);

                if (mob.stats.hp <= 0) {
                    mob.stats.hp = 0;
                    mob.curAction = Actions.DEAD;
                    mob.death();
                    mob.cont.addChildAt(UnitRender.getHpBar(mob.stats.hp / mob.stats.maxHp), 2);
                    return true;
                }
                mob.cont.addChildAt(UnitRender.getHpBar(mob.stats.hp / mob.stats.maxHp), 2);
                return false;
            }

            //return: true if attack is finished
            var attack = function (target) {
                if (mob.stats.atk.cd == 0) {
                    if (AnimationRender.unitAttack(mob.cont)) { //animation finished
                        target.makeDamage(mob.stats.atk.dmg + Utils.getRandomBetween(-2, 2));
                        mob.stats.atk.cd = mob.stats.atk.atkSpeed;
                        return true;
                    }
                } else {
                    mob.stats.atk.cd--;
                }
                return false;
            };

            mob.death = function () {
                console.log(mob.id + " death");
                AnimationRender.unitDeath(mob.cont);
                mob.curAction = Actions.DEAD;
            };


            mob.isDead = function () {
                return mob.stats.hp <= 0;
            };

            //return true when u get the destination
            mob.goToDesiredPosition = function () {
                var s = 3; //speed
                var movetask = mob.tasks[mob.tasks.length - 1];
                var range = goToPoint(mob, movetask.x, movetask.y, s)
                if (range < s) {
                    mob.curAction = Actions.IDLE;
                    return true;
                } else {
                    mob.curAction = Actions.WALK;
                    return false;
                }

            };

            //return true if unit have been attacked and animation finished
            mob.attackUnit = function attackUnit(units, targetID) {
                var targetUnit = units[targetID];
                var range;
                if (mob.curAction == Actions.WALK || mob.curAction == Actions.IDLE) {
                    range = goToPoint(mob, targetUnit.cont.x, targetUnit.cont.y, mob.stats.ms);
                    if (range <= mob.stats.atk.range) {
                        // if target close enough
                        mob.curAction = Actions.ATTACK;
                    }
                }
                if (mob.curAction == Actions.ATTACK) {
                    var attackFinished = attack(targetUnit);
                    if (attackFinished) {
                        mob.curAction = Actions.IDLE;
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

            //mob.__proto__= Unit;
            return mob;
        };

        return {createMob: createMob}

    });