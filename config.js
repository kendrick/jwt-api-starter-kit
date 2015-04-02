(function () {
    'use strict';

    module.exports = {
        dev: {
            databaseUri: 'mongodb://localhost:27017/writely',
            jwtSecret  : require('fs').readFileSync('./jwtSecret.txt', 'utf8')
        }
    }
})();