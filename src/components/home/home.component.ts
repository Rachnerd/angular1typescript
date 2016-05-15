import {TestService} from "../../services/test.service";

class HomeCtrl {
    static $inject = ['TestService'];
    //$router : ng.Router;
    constructor() {
        // console.log(testService, this.$router);
        // console.log(this.$router);
       // this.$router.navigate(['Other']);
       //  console.log('1');
    }
    $onInit() {
        // console.log('initialized')
        // console.log('2');
    }
    // $routerOnActivate(next: ng.ComponentInstruction) {
    //     // console.log('Activated', next);
    //     // console.log('3', next);
    // }
}

export var HomeConfig: ng.IComponentOptions = {
    templateUrl: `./components/home/home.component.html`,
    controller: HomeCtrl,
    bindings: { $router: '<'}
    // $canActivate: function () {
    //     return sessionStorage.getItem('user') != null;
    // }
};