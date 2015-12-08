define(['pixi.min'], function (pixi) {
    var getNick = function (name) {
        var style = {
            font: '12px Arial',
            fill: '#F7EDCA',
            stroke: '#4a1850',
            strokeThickness: 3,
            wordWrap: true,
            wordWrapWidth: 440
        };

        var richText = new PIXI.Text(name, style);
        richText.x = 0;
        richText.y = -10;

        return richText;
    };
    //percent of hp on input
    var getHpBar = function (hp) {
        var barSize = 70 * hp;
        var graphics = new PIXI.Graphics();

        graphics.beginFill(0xcc0000);
        graphics.lineStyle(5, 0xcc0000, 3);
        graphics.moveTo(-70, -70);
        graphics.lineTo(-70 + barSize, -70);
        graphics.endFill();
        return graphics;
    };
    return {
        getNick: getNick,
        getHpBar: getHpBar
    };
});
