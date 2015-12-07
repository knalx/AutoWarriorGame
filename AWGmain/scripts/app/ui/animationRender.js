define(['pixi.min'], function (PIXI) {
    var unitDeath = function (sprite) {
        var filter = new PIXI.filters.ColorMatrixFilter();
        var matrix = filter.matrix;
        var count = 5;
        matrix[1] = Math.cos(count) * 3;
        sprite.filters = [filter];
    };
    var unitAttack = function (sprite) {
        var renderSpeed = 10;
        if (sprite.animations.timer == 0) {
            sprite.animations.timer = renderSpeed;
        } else {
            sprite.animations.timer -= 1;
        }
        var t = sprite.animations.timer;

        if (t <= renderSpeed / 2) {
            sprite.rotation = sprite.rotation + 0.05;
        } else {
            sprite.rotation = sprite.rotation - 0.05;
        }
        ;

        if (t == 0) {
            return true; //animation finished
        } else {
            return false;
        }

    };

    return {
        unitDeath: unitDeath,
        unitAttack: unitAttack
    };


});
