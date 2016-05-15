System.config({
    defaultJSExtensions: true
});
System.import('./app').then(function() {
    /**
     *  Import scripts that should be executed after the angular module is created (in app.ts).
     */
    function importScript(src, onload) {
        var script = document.createElement('script');
        script.onload = onload;
        script.src = src;
        document.head.appendChild(script);
    }
    var loadedScripts = 0;

    /**
     *  When all scripts are loaded, boot the angular module.
     */
    function onload () {
        if(++loadedScripts == scripts.length) {
            document.body.appendChild(document.createElement('app'));
            angular.bootstrap(document.body, ['myApp']);
        }
    }
    var scripts = [
        'legacy/random-user.service.js'
    ];
    for(var i = 0; i < scripts.length; i++) {
        importScript(scripts[i], onload);
    }
});