/// <reference path="../typings/angularjs/angular-component-router.d.ts" />
/// <reference path="../typings/legacy/legacy.d.ts" />
import {HomeConfig} from "./components/home/home.component";
import {TestService} from "./services/test.service";
import {OtherConfig} from "./components/other/other";
import {PersonConfig} from "./components/people/person/person";
import {PeopleConfig} from "./components/people/people-root";

angular.module('myApp', ['ngComponentRouter'])
    .value('$routerRootComponent', 'app')
    .component('app', {
        template: `
            <h4>Root route</h4>
            <a ng-link="['Home']">Home</a>
            <a ng-link="['Other']">People</a>
            <br />
            <ng-outlet></ng-outlet>
        `,
        $routeConfig: [
            {
                path: '/', component: 'home', name: 'Home'
            },
            {
                path: '/people/...', component: 'people', name: 'Other'
            },
            {
                path: '/**', redirectTo: ['Home']
            }
        ],
        controller: function () {        }
    })
    .component('home', HomeConfig)
    .component('other', OtherConfig)
    .component('person', PersonConfig)
    .component('people', PeopleConfig)
    .service('TestService', TestService);

