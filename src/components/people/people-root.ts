class PeopleCtrl {
    static $inject = [];
    constructor() {
        // console.log(testService, this.$router);
        // console.log(this.$router);
        console.log('1');
    }
    // $onInit() {
    //     // console.log('initialized')
    //     console.log('2');
    // }
    // $routerOnActivate(next: ng.ComponentInstruction) {
    //     // console.log('Activated', next);
    //     console.log('3', next);
    // }
}

export var PeopleConfig: ng.IComponentOptions = {
    template: `
        <h4>People Route</h4>
        <ng-outlet></ng-outlet>
    `,
    controller: PeopleCtrl,
    $routeConfig: [
        {
            path: 'overview', component: 'other', name: 'Overview', useAsDefault: true
        },
        {
            path: 'overview/details/:id', component: 'person', name: 'Details'
        }
    ],
    $canActivate: function () {
        return true;
    }
};