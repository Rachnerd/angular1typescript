angular.module('myApp').directive('user', function () {
    return {
        restrict: 'E',
        templateUrl: './legacy/user.directive.html',
        scope: {
            user: '='
        },
        controller: function () {}
    }
}).filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});