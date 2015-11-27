requirejs.config({
    baseUrl: 'scripts/lib',
    paths: {
        app: '../app'
    }
});

requirejs(['pixi.min', 'app/main', 'app/utils'],
    function (pixi, main, Utils) {
        var renderer = pixi.autoDetectRenderer(800, 500, {backgroundColor: 0xDD5D5D5});
        document.body.appendChild(renderer.view);

        var stage = new PIXI.Container();
        var container = new PIXI.Container();

        stage.addChild(container);

        var heroes = main.initHeroes();

        var keys = Utils.getKeys(heroes);
        keys.forEach(function (key) {
            container.addChild(heroes[key].cont);
        });
        container.x = 10;
        container.y = 10;

        var tick = 0;

        requestAnimationFrame(animate);

        // start animating
        function animate() {
            tick += 1;
            main.makeTick(heroes, tick);
            renderer.render(stage);
            // request another animation frame...
            requestAnimationFrame(animate);
        }


    });


