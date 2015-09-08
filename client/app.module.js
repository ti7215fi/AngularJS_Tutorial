/**
 * @namespace Modules
 * @description Hauptmodul
 * @param {type} Name der Anwendung
 * @param {type} Abhängigkeiten (Animationen, Routing, Unit-Testing)'ngMock'
 */
(function(){
    
    'use strict';
    
    angular
        .module('tutorialApp', [ 'loginModule','ngAnimate', 'ngRoute'  ]);
    
})();


