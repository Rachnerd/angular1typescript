/// <reference path="./random-user.d.ts" />


declare module Legacy {
    import User = RandomUser.User;
    import IPromise = angular.IPromise;

    interface RandomUserService {
        users: Array<User>;
        generate(amount:number):IPromise<Array<User>>;
        create():IPromise<User>;
        delete(user:User):void;
    }
}