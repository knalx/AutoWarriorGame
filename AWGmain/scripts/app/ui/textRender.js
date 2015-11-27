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
    }
    return {
        getNick: getNick
    };
});
