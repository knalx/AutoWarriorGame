define(['pixi.min', 'app/utils', 'app/ui/textRender'], function (pixi, Utils, TextRender) {
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

        var warrior = {cont: container};
        warrior.id = "w" + number;

        warrior.stats = {
            hp: 100,
            mp: 100,
            ms: 3,
            atk: {
                dmg: 50,
                cd: 0,
                castSpeed: 10
            }
        };
        warrior.tasks = new Array();

        //!! remove
        if (n == 4) {
            n = 0;
        }
        warrior.tasks.push(createMoveTask(Utils.getRandom(), Utils.getRandom()));
        warrior.tasks.push(createKillTask('w' + (n + 1)));


        //return true if target killed
        warrior.attack = function (unit) {
            if (warrior.stats.atk.cd == 0) {
                unit.stats.hp -= warrior.stats.atk.dmg;
                warrior.stats.atk.cd = warrior.stats.atk.castSpeed;

                if (unit.stats.hp <= 0) {
                    var filter = new PIXI.filters.ColorMatrixFilter();
                    var matrix = filter.matrix;
                    var count = 5;
                    matrix[1] = Math.cos(count) * 3;
                    unit.cont.filters = [filter];
                    return true;
                }
            } else {
                warrior.stats.atk.cd--;
            }
            return false;
        };

        return warrior;
    };


    return {createWarrior: createWarrior}


});