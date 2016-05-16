# The new Angular 1
###Quintor
#####Rachèl Heimbach
Angular 1.5.5 has some new Angular 2 features which should be less of a pain to migrate to Angular 2.
This workshops focuses on how to write Angular 2 friendly Angular 1 code and how to combine legacy ES5 code with TypeScript.

## Context
You've decided to continue the Angular 2 way of programming in an Angular 1 application. 



## Install
Clone repo and execute the following command:
```
npm install
```

## Run
```
gulp serve
```

## Content
##### Legacy code
This code is an example of old code that is still necessary to run an application.
ES5 code needs some special treatment when combined with TypeScript + ES6.

The legacy code used in this workshop is not intended to be migrated to Angular 1.5.5.

##### Angular 1.5.5 code (TS + ES6)
The new code will be written Angular 2 style.
```
Differences between legacy and new:

Legacy          Angular 1.5.5

ES5             TypeScript + ES6
$scope          controllerAs: $ctrl; var vm = this;
controllers     components
function        classes and arrow functions () => {}
var             let
-               Types
ngRoute         Angular 2 component router.     
```

Angular 1 used to be a mcv/mvvm framework. The last couple of releases of Angular
provided the tools to create a component structured application (like Angular 2).

## Assignments 1 Setup
##### Special treatment legacy code.

static $inject
constructor di

Angular 1 types ng.

Legacy code d.ts
Component
onActivate
this.$routerOnActivate = function(next, previous) {
  // Get the hero identified by the route parameter
  var id = next.params.id;
  return heroService.getHero(id).then(function(hero) {
    $ctrl.hero = hero;
  });
};
onInit
canActivate
Retrieve injector Angular 2 style. 
Navigating in js with $router.
$ctrl controllerAs default
vm
