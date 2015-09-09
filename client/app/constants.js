/**
 * @namespace Constants
 * @description Enthält alle, in der Anwendung verwendeten, Konstanten
 */
(function(){
    
    'use strict';
    
    angular
        .module('app')
        .constant('map', function(){ return L.Map("map")})
        .constant('L', L);
    
})();
