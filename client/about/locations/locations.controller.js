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
            var map = L.map('map').setView([50.9847679, 11.0298799], 13);
            
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                        maxZoom: 18,
            }).addTo(map);
           
            
            return locationHandler.getLocations();
        };
        
    };
    
})();

