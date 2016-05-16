/// <reference path="../typings/angularjs/angular-component-router.d.ts" />
/// <reference path="../typings/legacy/legacy.d.ts" />

import {PeopleConfig} from "./components/people/people";
import {HomeConfig} from "./components/home/home.component";

let AppConfig: ng.IComponentOptions = {
    templateUrl: 'app.html',
    $routeConfig: [
        {
            path: '/people', component: 'people', as: 'People'
        },
        {
            path: '/:id', component: 'home', as: 'Home'
        }
    ]
};
export class TestCtrl {
    static $inject = ['$element', '$timeout'];
    homeCtrl: any;
    constructor($element, $timeout) {

        // this.$onChanges = function(changes) {
        //     var keys = Object.keys(changes);
        //     console.log(changes['person']);
        // };
        // this.$postLink = function () {
        //     //console.log($element);
        // };
    }
    $onChanges(changes: any) {

    }
    $onInit() {
        this.homeCtrl.registerPersonElement(this);
    }
    $onDestroy() {
        console.log('I DIE')
    }
}
angular.module('myApp', ['ngComponentRouter'])
    .value('$routerRootComponent', 'app')
    .component('app', AppConfig)
    .component('home', HomeConfig)
    .component('people', PeopleConfig);
angular.module('myApp').component('test', {
    bindings: {
        person: '<',
        test: '<'
    },
    require: {
        homeCtrl: '^home'
    },
    template: `{{vm.person.name.first}}`,
    controllerAs: 'vm',
    controller: TestCtrl
});
