class HomeComponent {
    static $inject = [];
    constructor() {}
}

export let HomeComponentOptions: ng.IComponentOptions = {
    templateUrl: `./components/home/home.component.html`,
    controller: HomeComponent
};