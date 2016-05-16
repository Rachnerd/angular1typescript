class HomeCtrl {
    users;
    static $inject = ['RandomUserService'];
    constructor(RandomUserService) {
        this.users = JSON.parse(sessionStorage.getItem('users'));
        if(!!this.users) return;
        RandomUserService.generate(10).then(users => {
            this.users = users;
            sessionStorage.setItem('users', JSON.stringify(this.users));
        })
    }

}

export var HomeConfig = {
    templateUrl: `./components/home/home.component.html`,
    controller: HomeCtrl
};