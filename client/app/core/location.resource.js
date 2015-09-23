/**
 * @namespace Service
 * @description Organize and handle the resource of the locations.
 */
(function(){
    
    'use strict';
    
    angular
            .module('app.core')
            .value('resourceLocation', null)
            .service('locationResource', locationResource);
    
    locationResource.$inject = ['$resource', 'resourceLocation'];
    
    function locationResource($resource, resourceLocation){
        
        resourceLocation = $resource('/location/:name');
        
        var actions = {
            getLocations        : getLocations,
            getLocationByName   : getLocationByName,
            addLocation         : addLocation,
            deleteLocationByName: deleteLocationByName
        };
        return actions; 
        
        //////////////////////////////////////////////
        
        function getLocationByName(name){
            return resourceLocation.get({ name:name });
        }
        
        function getLocations(){
            return resourceLocation.query();
        }
        
        function addLocation(location){
            resourceLocation.save(location);
        }
        
        function deleteLocationByName(name){
            resourceLocation.delete({ name:name });
        }
        
    }
    
    
})();


