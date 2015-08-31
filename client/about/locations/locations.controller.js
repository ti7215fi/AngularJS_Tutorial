(function(){
    
    'use strict';
    
    angular
            .module('tutorialApp')
            .controller('LocationController', LocationController);
    
    LocationController.$inject = ['locationHandler', '$scope'];
    
    function LocationController(locationHandler, $scope){
        
        activate();
        $scope.loc = locationHandler;
        
        
        ////////////////////////////////////////////
        function activate(){
            return locationHandler.getLocations();
        };
        
    };
    
})();

