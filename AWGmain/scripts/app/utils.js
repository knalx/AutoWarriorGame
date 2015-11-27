define([], function () {
    return {
        getRandom: function () {
            var min = 1;
            var max = 480;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        getRandomBetween: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        getKeys: function (obj) {
            var keys = [];
            for (var key in obj) {
                keys.push(key);
            }
            return keys;
        }
    }
});
