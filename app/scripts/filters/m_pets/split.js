/**
 * Created by bernalge on 5/16/16.
 */
angular.module('filters', []).
    filter('split', function() {
        return function(input, delimiter) {
            if(input != undefined) {
                var delimiter = delimiter || ',';
                return input.toString().split(delimiter);
            }
        }
});