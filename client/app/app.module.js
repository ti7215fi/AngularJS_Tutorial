/**
 * @namespace Modules
 * @description Hauptmodul
 * @param {type} Name der Anwendung
 * @param {type} Abhängigkeiten (Animationen, Routing, Unit-Testing)'ngMock', 
 */
(function () {

    'use strict';

    angular
            .module('app', [
                'ngAnimate',
                'ui.bootstrap',
                'app.core',
                'app.start',
                'app.login',
                'app.admin',
                'app.about'
            ]);


})();


