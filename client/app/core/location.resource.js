/**
 * @namespace Service
 * @description Organize and handle the resource of the locations.
 */
(function(){
    
    'use strict';
    
    angular
            .module('app.core')
            .factory('locationResource', locationResource);
    
    locationResource.$inject = ['$resource'];
    
    function locationResource($resource){
        
        return $resource('/location/:name');
        
    }
    
    
})();


