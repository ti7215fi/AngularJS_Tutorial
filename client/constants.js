/**
 * 
 * @namespace Constants
 */
(function(){
    
    'use strict';
    
    angular
        .module('tutorialApp')
        .constant('map', function(){ return L.Map("map")})
        .constant('L', L);
    
})();
