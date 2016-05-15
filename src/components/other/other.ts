import User = RandomUser.User;
import RandomUserService = Legacy.RandomUserService;
import IInjectorService = angular.auto.IInjectorService;
import {Injector} from "../../config";

class OtherCtrl {
    static $inject = ['RandomUserService'];
    users: Array<User> = [];
    constructor(RandomUserService: RandomUserService) {
        this.users = RandomUserService.users;
        console.log(this.users);
    }
}

export let OtherConfig: any = {
    templateUrl: `./components/other/other.html`,
    controller: OtherCtrl,
    bindings: { $router: '<'},
    $canActivate: () => {
        var injector = Injector.getInstance(),
            RandomUserService:RandomUserService = <RandomUserService>injector.get('RandomUserService');
        return RandomUserService.generate(10).then(users => {
            RandomUserService.users = users;
            return users;
        });
    }
};