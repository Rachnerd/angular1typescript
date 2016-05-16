/// <reference path="../typings/angularjs/angular-component-router.d.ts" />
/// <reference path="../typings/legacy/legacy.d.ts" />



let AppConfig: ng.IComponentOptions = {
    template: `<h4>Welcome to the new Angular 1</h4>`
};

angular.module('myApp', ['ngComponentRouter'])
    .value('$routerRootComponent', 'app')
    .component('app', AppConfig);

