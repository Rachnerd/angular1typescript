class HomeCtrl {
    users;
    static $inject = ['RandomPersonService'];
    constructor(RandomPersonService) {
        this.users = JSON.parse(sessionStorage.getItem('users'));
        if(!!this.users) return;
        RandomPersonService.generate(10).then(users => {
            this.users = users;
            console.log(users);
            //sessionStorage.setItem('users', JSON.stringify(this.users));
        })
    }

}

export var HomeConfig = {
    templateUrl: `./components/home/home.component.html`,
    controller: HomeCtrl
};