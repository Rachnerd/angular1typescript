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
This code is an example of old code that is still necessary to run the application.
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

## Assignments 1 Checking setup
##### App.ts
The first thing an Angular 1 application needs is a module.
```javascript
angular.module('myApp', ['ngComponentRouter'])
```
Just like in Angular 2, the component router needs a root component (component tree root).
```javascript
.value('$routerRootComponent', 'app')
```
To create the actual root component app, TS + ES6 come into play.
```javascript
let AppConfig: ng.IComponentOptions = {
    template: `<h4>Welcome to the new Angular 1</h4>`
};
.component('app', AppConfig);
```
_Components expect an object as second parameter, not a function._
Since the AppConfig is typed, only API attributes are allowed.

##### TypeScript Declaration files.
The type of AppConfig is stored in a so called declaration file (d.ts) in the
typings directory. The goal of these files is to tell the TypeScript compiler
about ES5 code.

```
Scroll through the angular.d.ts file in /typings
```
Inside the file a module is created and collapsed into a variable called 'ng'.
This variable is directory accessible throughout the application if it is 
referenced.
```
Open App.ts and look at the references in comments on top.
```
It is also possible to import certain types.
```javascript
import IComponentOptions = angular.IComponentOptions;
AppConfig:IComponentOptions
//identical to
ng.IComponentOptions
```

```
From now on try to add a type to every Angular feature you encounter.
```


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
