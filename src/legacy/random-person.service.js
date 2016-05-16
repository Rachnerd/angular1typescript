angular.module('myApp').service('RandomPersonService', ['$http', function ($http) {
    this.users = JSON.parse(sessionStorage.getItem('users')) || [];
    var self = this;
    this.generate = function (amount) {
        return $http.get('https://randomuser.me/api/?results=' + amount)
            .then(function (res) {
                self.users = res.data.results;
                for(var i = 0; i < self.users.length; i++) {
                    self.users[i].id = i;
                }
                return self.users;
            });
    };
    this.create = function () {
        return $http.get('https://randomuser.me/api/')
            .then(function (res) {
                self.users.push(res.data);
                return res.data.results[0];
            });
    };
    this.delete = function (user) {
        var index = this.users.indexOf(user);
        this.users.splice(index, 1);
    };
}]);