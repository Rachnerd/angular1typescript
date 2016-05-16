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
#### Legacy code
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

## Assignment 1 Checking setup
#### App.ts
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

#### TypeScript Declaration files.
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

#### Special treatment ES5 code.
The application module is declared in TypeScript which is loaded asynchronously
by Systemjs. Legacy code doesn't get loaded by systemjs and is loaded synchronously.
This causes a lot of errors because modules have to be instantiated (like in app.ts) before they
can be used (like in legacy/random-user.service.js).
```
Take a look in index.html to the systemjs implementation.
```
This code makes sure that the angular module is imported before the legacy scripts are loaded.
It imports the app file first and then appends script tags that reference legacy scripts to the document.
After everything is loaded it add's ng-app to the body of the document and an app element to the DOM (which is defined in app.ts)

## Assignment 2 Routing
#### PeopleComponent
```
Import the PeopleConfig into app.ts and add it to the angular module as a component.
Assign it the name: 'people'.
```
Now we've added our first component (other than app) to the angular module.
It can be accessed either by using it in a template like <people></people>
or by setting up a route.

```javascript
//path object
{
    path: 'url', component: 'componentName', as: 'ComponentName'
}
```

```
Inside the AppConfig add a new property $routeConfig and set it with an 
array containing one path object for url: '/people'.
```
It's important to know that the 'as' value is the name needed for redirecting.

To be able to see the components linked to the router, a router outlet has to be
defined.
```html
<ng-outlet></ng-outlet>

<a ng-link="['ComponentName']">ComponentName</a>
```
```
Append the template of app.ts with the router outlet.

To be able to see the people route add a link to the people
route above the outlet.
```
#### Childroutes 
The PeopleComponent will serve as a childrouter. This means that the app will reference
PeopleComponent and that PeopleComponent will take care of its child components.
This way not all routes will end up in app.ts but will be distributed where relevant.

```
Create a OverviewComponent in /people/overview and add it to the angular module in app.ts.
Implement $routeConfig in PeopleComponent with a route to overview.
Go to app.ts and tell the router PeopleComponent contains a routeconfig by adding 3 dots
to the route: '/people/...'.
Add ng-outlet to the PeopleComponent's template.
Create a link above the ng-outlet to overview.
```

You should be able to access: '/#/people/overview'.

## Assignment 3 Legacy code.
#### Fixing legacy code.
In the new OverviewComponent we want to use the RandomPersonService (src/legacy/random-person.service.js) which
retrieves random people with properties (see /typings/legacy/random-person.d.ts).

The Angular 1 service is written in ES5 and doesn't fit with the new code.
It's possible to neglect all benefits of TypeScript and inject the service directly
but we're going to implement the better solution.

```
Open up legacy.d.ts in typings.
The RandomPersonService interface should be filled in with the correct
types of our legacy service (src/legacy/random-person.service.js).

Implement the correct types for RandomPersonService.
First one is free.
```
#### Importing legacy code.
Now that the RandomUserService is typed we can implement it like any other TypeScript
interface.
```
In OverviewComponent inject RandomPersonService in the constructor and assign its type.
Extend the static $inject array with a string: 'RandomPersonService'.
```
The static $inject array tells the Angular code which dependencies to inject.

```
Generate 10 people with the RanomUserService and set the response to 
an people array of type Person.

Visualize the 10 people using ng-repeat in overview's template.
In the legacy code there's a directive for a person, implement it like follows:
```

```html
<div class="container">
    <div class="col-sm-4" ng-repeat="person in $ctrl.people">
        <person person="person"></person>
    </div>
</div>
```

By default Angular assigns the name $ctrl to components. This was decided as best practice.

## Assignment 4 Router lifecycle hooks.




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
