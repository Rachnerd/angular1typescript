angular.module('myApp').service('RandomPersonService', ['$http', function ($http) {
    this.people = JSON.parse(sessionStorage.getItem('people')) || [];
    var self = this;
    this.generate = function (amount) {
        return $http.get('https://randomuser.me/api/?results=' + amount)
            .then(function (res) {
                self.people = res.data.results;
                for(var i = 0; i < self.people.length; i++) {
                    self.people[i].id = i;
                }
                return self.people;
            });
    };
    this.create = function () {
        return $http.get('https://randomuser.me/api/')
            .then(function (res) {
                self.people.push(res.data);
                return res.data.results[0];
            });
    };
    this.delete = function (person) {
        var index = this.people.indexOf(person);
        this.people.splice(index, 1);
    };
}]);