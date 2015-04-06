(function () {
    'use strict';

    var config = Object.freeze({
        dev: {
            databaseUri: 'mongodb://localhost:27017/writely',
            jwtSecret  : require('fs').readFileSync('./jwtSecret.txt', 'utf8'),
            tokenExpirationInMinutes: 60 * 24 * 180
        }
    });

    module.exports = function (environment) {
        var env = environment || process.argv.slice(2)[0] || 'dev';

        return config[env];
    };
})();