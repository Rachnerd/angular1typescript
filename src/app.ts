/// <reference path="../typings/angularjs/angular-component-router.d.ts" />
/// <reference path="../typings/legacy/legacy.d.ts" />

import {HomeConfig} from "./components/home/home.component";

angular.module('myApp', ['ngComponentRouter'])
    .value('$routerRootComponent', 'app')
    .component('app', {
        template: `<h4>Welcome to the new Angular 1</h4>`,
        $routeConfig: [
            
        ]
    })
    .component('home', HomeConfig);

