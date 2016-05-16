class PeopleCtrl {
    static $inject = [];
    test =123;
    constructor() {
        
    }
    $onChanges(event) {
        console.log(event);
    }
}

export let PeopleConfig: ng.IComponentOptions = {
    template: `<h4>People Component</h4>{{$ctrl.test}}`,
    controller: PeopleCtrl
};