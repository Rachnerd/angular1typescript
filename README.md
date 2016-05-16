# The new Angular 1
###Quintor
#####Rachèl Heimbach
Angular 1.5.5 has some new Angular 2 features which should be less of a pain to migrate to Angular 2.
This workshops focuses on how to write Angular 2 friendly Angular 1 code and how to combine legacy ES5 code with TypeScript.

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

Routing + Child routes
Root
ng-outlet
ng-link

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

