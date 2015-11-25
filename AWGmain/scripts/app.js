requirejs.config({
    baseUrl: 'scripts/lib',
    paths: {
        app: '../app'
    }
});

requirejs(['pixi.min', 'app/main'],
    function (pixi, main) {
        var renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0x232b17});
        document.body.appendChild(renderer.view);

        var stage = new PIXI.Container();
        var container = new PIXI.Container();

        stage.addChild(container);

        var warriors = new Array();
        for (var j = 0; j < 5; j++) {
            var warrior = createWarrior()
            warriors.push(warrior);
            container.addChild(warrior);
        }
        ;


        container.x = 100;
        container.y = 60;

        var tick = 0;

        requestAnimationFrame(animate);

// start animating

        function animate() {
            tick += 2;
            makeTick(warriors, tick);
            renderer.render(stage);
            // request another animation frame...
            requestAnimationFrame(animate);
        }

    });