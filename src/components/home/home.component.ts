import IControllerService = angular.IControllerService;
import {TestCtrl} from "../../app";
class HomeCtrl {
    users;
    static $inject = ['RandomPersonService', '$timeout'];
    constructor(RandomPersonService, $timeout) {
        this.users = JSON.parse(sessionStorage.getItem('users'));
        if(!!this.users) return;
        RandomPersonService.generate(10).then(users => {
            this.users = [users[0], users[1]];
            //sessionStorage.setItem('users', JSON.stringify(this.users));
        });
    }
    registerPersonElement(personCtrl: TestCtrl) {
        console.log(personCtrl);
    }
    $routerOnActivate(next: ng.ComponentInstruction) {
        console.log(next.params['id']);
    }
    $routerCanDeactivate() {
        return true;
    }
}

export var HomeConfig = {
    templateUrl: `./components/home/home.component.html`,
    controller: HomeCtrl
};