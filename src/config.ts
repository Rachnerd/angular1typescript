import IInjectorService = angular.auto.IInjectorService;
abstract class ConfigClass {
    static ngAppElement: HTMLElement = document.body;
}

export var Config = ConfigClass;

abstract class InjectorClass {
    static getInstance():IInjectorService {
        return angular.element(Config.ngAppElement).injector();
    }
}
export var Injector = InjectorClass;