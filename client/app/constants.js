/**
 * @namespace Constants
 * @description Contains all of the constants, used in the application.
 */
(function(){
    
    'use strict';
    
    angular
        .module('app')
        .constant('map', function(){ return L.Map("map")})
        .constant('L', L)
        .constant('user', null);
    
})();
