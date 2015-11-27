define([], function () {
    return {
        getRandom: function () {
            var min = 1;
            var max = 600;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        getRandomBetween: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
});
