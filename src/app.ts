/// <reference path="../typings/angularjs/angular-component-router.d.ts" />
/// <reference path="../typings/legacy/legacy.d.ts" />

let AppComponentOptions: ng.IComponentOptions = {
    templateUrl: './app.html',
    $routeConfig: []
};
angular.module('myApp', ['ngComponentRouter'])
    .value('$routerRootComponent', 'app')
    .component('app', AppComponentOptions);