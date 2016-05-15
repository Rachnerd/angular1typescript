import IPromise = angular.IPromise;
class PersonCtrl {
    static $inject = [];
    constructor() {
        // console.log(testService, this.$router);
        // console.log(this.$router);
        // console.log('1');
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
export var PersonConfig: ng.IComponentOptions = {
    template: `
        Person
    `,
    controller: PersonCtrl,
    $canActivate: function () {
        return true;
    }
};