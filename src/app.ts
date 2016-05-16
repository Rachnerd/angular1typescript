/// <reference path="../typings/angularjs/angular-component-router.d.ts" />
/// <reference path="../typings/legacy/legacy.d.ts" />

import {PeopleConfig} from "./components/people/people";
import {HomeConfig} from "./components/home/home.component";

let AppConfig: ng.IComponentOptions = {
    templateUrl: 'app.html',
    $routeConfig: [
        {
            path: '/people', component: 'people', as: 'People'
        }
    ]
};

angular.module('myApp', ['ngComponentRouter'])
    .value('$routerRootComponent', 'app')
    .component('app', AppConfig)
    .component('home', HomeConfig)
    .component('people', PeopleConfig);

