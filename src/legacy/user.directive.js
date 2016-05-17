angular.module('myApp').directive('user', function () {
    return {
        restrict: 'E',
        templateUrl: './legacy/person.directive.html',
        scope: {
            user: '='
        },
        transclude: true,
        controller: function () {}
    }
}).filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});