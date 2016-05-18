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
The code available in ./src/legacy simulates functioning code that is not worth
migrating to new standards. It works just fine and nobody is going to pay for that migration.
This type of ES5 code does however need some special treatment when combined with TypeScript + ES6.

##### Angular 1.5.5 code (TS + ES6)
The new code will be written Angular 2 style.
```
Differences between legacy and new:

Legacy          Angular 1.5.5

ES5             TypeScript + ES6
$scope          controllerAs: $ctrl;
controllers     components
function        classes and arrow functions () => {}
var             let
-               Types
ngRoute         Angular 2 component router.
```

Angular 1 used to be a mcv/mvvm framework. The last couple of updates for Angular
provided the tools to create a component structured application (like Angular 2).

## Assignment 0 Checking setup
#### App.ts
The first thing an Angular 1 application needs is a module. This module will be placed
in the root of our application. Since we're using the Angular 2 component router we
have to declare a root component.
```javascript
angular.module('myApp', ['ngComponentRouter'])
.value('$routerRootComponent', 'app')
```

To create the actual root component app, TS + ES6 come into play.
```javascript
let AppComponentOptions: ng.IComponentOptions = {
    template: `<h4>Welcome to the new Angular 1</h4>`
};
.component('app', AppComponentOptions);
```
Since AppComponentOptions is typed, only API attributes are allowed.

#### TypeScript Declaration files.
The type of AppComponentOptions is stored in a so called declaration file (d.ts) in ./typings.
These files act like a typed layer on top of the existing ES5 code so the TS compiler allows it to be called.
```
Open app.ts and look at the references in comments on top.
Scroll through the angular.d.ts file in /typings
```

The angular module is created and collapsed into a variable called 'ng'.
This prefix is directly available without having to import it.

```javascript
import IComponentOptions = angular.IComponentOptions;
AppConfig:IComponentOptions
//identical to
ng.IComponentOptions
```

I would advice you to use the ng. prefix because the imports stack up quite quickly.

```
From now on try to add a type to every Angular feature you encounter.
```

#### Special treatment ES5 code.
The application module is declared in TypeScript which is loaded asynchronously
by Systemjs. Like mentioned before, TypeScript only allows specific calls to the global scope
which means that TypeScript doesn't control the initialization of the legacy ES5 code.

```
Take a look in index.html at the systemjs implementation.
```

This code makes sure that the angular module is imported before the legacy scripts are loaded.
It imports the app file first and then appends script tags that reference legacy scripts to the document.
After everything is loaded it adds ng-app to the body of the document which boots up Angular.

Now the legacy code gets loaded after the angular module they depend on is instantiated.

## Assignment 1 Component + Routing
```javascript
// Angular 1.5
module.component(name, options);
// Angular 1.4
module.directive(name, fn);
```
_[What's new in Angular?](https://medium.com/google-developer-experts/angular-new-features-in-angularjs-1-5-24f9b503af15#.5h7srxy30)_
#### PeopleComponent
```
In app.ts, import PeopleComponentOptions and add it to the angular module
as a component called 'people'.
```

Now we've added our first component to the angular module (other than app).
It can be accessed either by using it in a template like <people></people>
or by setting up a route.

#### RootRouter
```javascript
//path object example
{
    path: 'url', component: 'component', as: 'Component'
}
```

```
Inside AppComponentOptions add a new property $routeConfig and set it to an 
array containing one path object for url: '/people'.
```
It's important to know that the 'as' value is the name needed for redirecting.

To be able to see the components linked to the router, a router outlet has to be
defined.
```html
<ng-outlet></ng-outlet>

<a ng-link="['Component']">Component</a> <!-- !example values! -->
```

```
Append the template of app.ts with the router outlet.

To be able to see the people route add a link to the people
route above the outlet.
```

Lastly you can implement a wildcard route that redirects to whatever route you want.
```javascript
{
    path: '/**', redirectTo: ['People']
}
```

#### ChildRouter 
The PeopleComponent will be the first specific branch of the component tree and
will be the root of all People related functionality. The PeopleComponent will 
become a child router.

```
Create a OverviewComponent in /people/overview and add it to the angular module.

Implement $routeConfig in PeopleComponent with a route to overview.

Add ng-outlet to the PeopleComponent's template.

Open app.ts and tell the root router that PeopleComponent contains a routeconfig by adding 3 dots
to the route: '/people/...'.

Create a link to overview next to the People link.
```

You should be able to access: '/#/people/overview'.

## Assignment 2 Legacy code.
The overview page will visualize a bunch of randomly generated [people](https://randomuser.me/).
The service for retrieving these people is already written in ES5. Let's properly integrate that 
service with our TS code.

#### Fixing legacy code.
In the new OverviewComponent we want to use the RandomPersonService (src/legacy/random-person.service.js) which
retrieves random people with some properties (see /typings/legacy/random-person.d.ts).

```
Open up ./typings/legacy/legacy.d.ts.

Implement the correct types for RandomPersonService.
people  | array of people
create | promise that returns a person
delete | expects a person but returns nothing
```

#### Importing legacy code.
Now that the RandomPersonService is typed we can implement it like any other TypeScript
interface.
```
In OverviewComponent, inject RandomPersonService in the constructor and assign its type.
Add 'RandomPersonService' to the static $inject array.
```
_The static $inject array tells the Angular injector which dependencies to inject.__

```
Generate 10 people with the RandomPersonService and save the response to
a people property in OverviewComponent (don't use 'function').

Visualize the 10 people using ng-repeat in overview's template.
In the legacy code there's a directive for a user, implement it like follows:
```

```html
<div class="container">
    <div class="col-sm-4" ng-repeat="person in $ctrl.people">
        <user user="person"></user>
    </div>
</div>
```

By default Angular assigns the name $ctrl to components. This was decided as best practice.

#### Converting legacy code
The user directive inside the legacy directory is loaded with outdated techniques like $scope.
We want to create a component tree structure in our application so we'll create another component called person.
```
Open ./src/component/people/person/person.ts

Configure the person component so it binds (on-way bind '<') a person.
Set controllerAs: 'vm' and copy the html of the user directive (legacy)
to the person template. Refactor all user references to vm.person.
Refactor overview.html so it renders person and not user.
```

## Assignment 3 Component lifecycle hooks.
Angular 1.5.5 provides Angular 2 lifecycle hooks to components.

#### $onInit
This hook serves as a new constructor for component controllers.
In stead of putting component initialization code in the controller's
constructor it should be put in $onInit.

_"Okay great. But uhm… what’s the big deal? Well, while the resulting output 
will be the same, we now have the nice side effect that this component doesn’t 
do any initialization work when its constructor is called. Imagine we’d need to
 do some http requests during initialization of this component or controller. 
 We’d need to take care of mocking these requests whenever we construct such a 
 component. Now we have a better place for these kind of things." - [Pascal Precht](http://blog.thoughtram.io/angularjs/2016/03/29/exploring-angular-1.5-lifecycle-hooks.html#oninit)_


```
Move OverviewComponent's initialization code to the $onInit hook.
From now on use $onInit if you need to initialize a component.
```

#### $onChanges
This life hook is called every time an one-way bind '<' has changed reference.
Primitive types are always reassigned when changed and will trigger this hook, objects and arrays
might not. Manipulating the content of an object or array won't trigger this hook because
the changed object/array still references the same object/array.
```
Implement $onChanges in the person component and log the changed parameter.
```
You should see an object that contains all bindings as indexes. On each index is
a currentValue and previousValue.

#### $onDestroy
The most obvious of them all is onDestroy. Hook that gets called when the component
gets destroyed. When changing routes this hook can do some cleaning up work in components.
```
Implement $onDestroy so it logs something.
Change route and see the magic happen.
```

#### $postLink
The last hook is called after this components element and its children elements are 
linked. This is the best spot to do DOM manipulation.
```
Inject $element into the controller of the person component.
Implement $postLink and log the html element of person.
```

## Assignment 4 Additional component config attributes.
#### Multi transclusion
_[Multi transclusion](https://medium.com/google-developer-experts/angular-new-features-in-angularjs-1-5-24f9b503af15#.5h7srxy30)_

First thing to note is that the current typings file of Angular is a bit outdated.
IComponentOptions only allows a boolean for transclude while the new api allows multi transclusion.

Here's how we allow the typescript controller to use multi transclusion:
```javascript
interface MyComponentOptions extends ng.IComponentOptions {
    transclude: any;
}
.component('cmpName', <MyComponentOptions> {
    ...
});
```

Now we can use multitransclusion.

```javascript
transclude: {
    left: 'buttonLeft'
},
```

```html
<!--Person-->
<div ng-transclude="left"></div>
```
```html
<!--Overview-->
<person>
    <button-left>
        <button>
    </button-left>
</person>
```

```
Bind 2 button placeholders called buttonLeft and buttonRight.

Let person transclude a left and right button and implement them
in overview (see example).
```

#### Require
When there's a scenario where a container component needs to keep track of
its child elements, require is the solution.
```
In overview add a method to the component called: 'register(element: HTMLElement)'
which logs its given parameter.
In person component add require: { overviewCtrl: '^overview' }. 
Call the overview register with $element[0] in $postLink.
```

#### $router binding
Redirecting is made very simple with the RouterLink directive, but what if
we want to redirect in code? The needed $router is not available in the injector.
The Angular component router creates a root $router and passes childrouters to 
its children. The only thing we have to do is bind it to the component.

```
In overview, add a binding $router: '<'.
To test navigation use it in the controller of overview and navigate to home.
(Don't try to inject it, this.$router suffices).
```

## Assignment 5 Component router lifecycle hooks.
```
Setup a detail component in /people/detail/.
Add it to the Angular module in app.ts.
Add a route to PeopleComponent with path 'detail/:id'
```
#### $routerOnActivate
```javascript
//inside a controller class
$routerOnActivate(next: ng.ComponentInstruction) {
 
}
```
When a component gets activated this hook is called with a next route object. 
This object also contains the potential route parameters.
```
Implement $routerOnActivate in the detail component and retrieve the 
id routeparameter from the next component instruction.

TypeScript might complain about next.params.something but doesn't 
about next.params['something'].
```

#### $routerCanDeactivate
```javascript
//inside a controller class
$routerCanDeactivate() {
    return boolean || promise.
}
```
Each component can refuse to deactivate and prevent the next route from succeeding.
This method expects a boolean or promise.

```
Implement this hook in Overview and test its effect on the routing.
```

#### $canActivate
```javascript
//inside the component config
$canActivate() {
    return boolean || promise.
}
```
This is a tough one.. It's obvious what it does, but it needs special treatment.
$canActivate is declared in the component config and not inside a controller class.
The component config is an object that doesn't provide the injector, which means
that we can't inject anything into this hook.... or can we?

This solution is inspired by the Angular 2 solution to the same issue.

```
Add $canActivate to the config of the overview component.
Create a TypeScript file called injector.
```
The injector file will contain the current instance of the injector of the application.
```
Copy the following code into the injector file.
```
```javascript
abstract class InjectorClass {
    static getInstance():IInjectorService {
        return angular.element(document.body).injector();
    }
}
export let Injector = InjectorClass;
```

This file provides an Injector variable that returns the current injector.
It retrieves the element ng-app is attached to and returns its injector.

```
Back in the overviewcomponent's controller $canActivate create a 
let injector and fill it with Injector.getInstance().
```
Now we can inject parts of the application in the $canActivate hook.

```
Retrieve the RandomPersonService by calling the get function of the injector.
Implement $canActivate so it returns the RandomPersonService.generate(10)
method.
```
Now the component gets activated after the people are generated. 
```
Handle the success of the generate promise by setting the 
RandomPersonService.people to the response.
```

Now when the component gets activated it only has to retrieve the preloaded
people from the RandomPersonService.

```
Retrieve the preloaded people in OverviewComponent.
```

## Bonus
```
Implement a CRUD service that maintains the people.
Let overview handle update and delete, use the 2 transcluded buttons.

Perform DOM manipulation in a component using the best hook.

Create components with activate and deactivate conditions.
```