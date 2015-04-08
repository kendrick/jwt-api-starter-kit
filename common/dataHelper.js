(function () {
    'use strict';

    var _ = require('underscore');

    // updateDocument replaces the need for prop-by-prop assignments
    // in PUT operations. See http://stackoverflow.com/a/21269522
    exports.updateDocument = function (doc, SchemaTarget, data) {
        for (var field in SchemaTarget.schema.paths) {
            if ((field !== '_id') && (field !== '__v')) {
                var newValue = getObjValue(field, data);
                console.log('data[' + field + '] = ' + newValue);

                if (newValue !== undefined) {
                    setObjValue(field, doc, newValue);
                }
            }
        }

        return doc;
    };

    function getObjValue(field, data) {
        return _.reduce(field.split("."), function (obj, f) {
            if (obj) {
                return obj[f];
            }
        }, data);
    }

    function setObjValue(field, data, value) {
        var fieldArr = field.split('.');

        return _.reduce(fieldArr, function (o, f, i) {
            if (i == fieldArr.length-1) {
                o[f] = value;
            }
            else {
                if (!o[f]) {
                    o[f] = {};
                }
            }
            return o[f];
        }, data);
    }
})();