/// <reference path="./random-person.d.ts" />
declare module Legacy {
    import IPromise = angular.IPromise;

    interface RandomPersonService {
        users;
        generate(amount:number):IPromise<Array<Person>>;
        create;
        delete;
    }
}