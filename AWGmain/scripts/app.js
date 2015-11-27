requirejs.config({
    baseUrl: 'scripts/lib',
    paths: {
        app: '../app'
    }
});

requirejs(['pixi.min', 'app/main'],
    function (pixi, main) {
        var renderer = pixi.autoDetectRenderer(800, 500, {backgroundColor: 0xDD5D5D5});
        document.body.appendChild(renderer.view);

        var stage = new PIXI.Container();
        var container = new PIXI.Container();

        stage.addChild(container);

        var heroes = main.initHeroes();
        heroes.forEach(function (hero, i) {
            container.addChild(hero.cont);
        })
        container.x = 100;
        container.y = 100;
        //container.addChild(addNick());


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


