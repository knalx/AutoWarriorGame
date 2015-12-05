define(['pixi.min', 'app/utils', 'app/ui/textRender', 'app/ui/animationRender'], function (pixi, Utils, TextRender, AnimationRender) {
    var createWarrior = function (n) {
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

        warrior.stats = {
            hp: 100,
            mp: 100,
            ms: 3,
            atk: {
                dmg: 10,
                cd: 0,
                atkSpeed: 10,
                range: 10
            }
        };
        warrior.tasks = new Array();

        //!! remove
        if (n == 4) {
            n = 0;
        }
        warrior.tasks.push(createMoveTask(Utils.getRandom(), Utils.getRandom()));
        warrior.tasks.push(createKillTask('w' + (n + 1)));


        //return true if animation is finished
        warrior.attack = function (unit) {
            if (warrior.stats.atk.cd == 0) {
                if (AnimationRender.unitAttack(warrior.cont)) { //animation finished
                    unit.stats.hp -= (warrior.stats.atk.dmg + Utils.getRandomBetween(-2, 2));
                    warrior.stats.atk.cd = warrior.stats.atk.atkSpeed;
                    return true;
                }
            } else {
                warrior.stats.atk.cd--;
            }
            return false;
        };

        warrior.death = function () {
            console.log("death");
            AnimationRender.unitDeath(warrior.cont);
        }

        return warrior;
    };


    return {createWarrior: createWarrior}


});