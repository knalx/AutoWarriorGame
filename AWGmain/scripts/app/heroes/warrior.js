define(['pixi.min', 'app/utils', 'app/ui/textRender'], function (pixi, Utils, TextRender) {
    var createWarrior = function () {
        var container = new PIXI.Container();
        container.x = 40 + Utils.getRandom();
        container.y = 40 + Utils.getRandom();

        var sprite = PIXI.Sprite.fromImage('resource/art/warrior_stand.png');
        sprite.interactive = true;
        sprite.scale.x = 0.3;
        sprite.scale.y = 0.3;
        container.addChild(sprite);
        var number = Utils.getRandomBetween(100, 200);
        container.addChild(TextRender.getNick('w' + number));

        var warrior = {cont: container};
        warrior.id = "w" + number;

        warrior.stats = {
            hp: 100,
            mp: 100,
            ms: 3,
            attack: 10
        }

        warrior.destinationX = 400;
        warrior.destinationY = 200;
        warrior.tasks = new Array();

        warrior.tasks.push(createMoveTask(200, 200));

        warrior.move = function (x, y) {
            this.destinationX = x;
            this.destinationY = y;
        }
        return warrior;
    };


    return {createWarrior: createWarrior}


});