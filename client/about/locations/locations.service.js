(function(){
    
    'use strict';
    
    angular
            .module('tutorialApp')
            .factory('locationHandler', locationHandler);
    
    locationHandler.$inject = ['$http', '$rootScope'];
    
    function locationHandler($http, $rootScope){
      
        var city ;
        var distances = [];
        
        var actions = {
            setLocation : setLocation,
            getLocations : getLocations,
            getDistance : getDistance,
            getCity     : getCity,
            changeCity : changeCity,
            getDistances : getDistances,
        };
        return actions;
        
        /////////////////////////////
        
        function setLocation(loc){
            city = loc;
        };
        
        function getCity(){
            return city;
        };
        
        function getDistances(){
            return distances;
        };
        
        function changeCity(){
            var index = document.getElementById('select_location').selectedIndex;
            city = document.getElementById('select_location').options[index].text;
            console.log("city ", city);
            
            getDistance();
        };
        
        function getLocations(){
            $http.get('/locations').then(function(locationResponse){
               
               var locations = [];
               
               for(var index = 0; index < locationResponse.data.length; ++index){
                   locations[index] = { 'city' : locationResponse.data[index] };
               };
               
               console.log(locations);
               
                $rootScope.locations = locations;
                
            });
        };
        
        function getDistance(){
            $http.post('/getLocation', { location : city })
                    .success(successHandler)
                    .error(errorHandler);
            
            ////////////////////////////////////
            
            function successHandler(response){
                distances = response;
                
                for(var index = 0; index < distances.length; ++ index){
                  
                    if(distances[index].city === city){
                        delete distances[index];
                        break;
                    }
                    
                };
                
                console.log("POST /getLocation successful!");
            }
            
            function errorHandler(){
                console.log("POST /getLocation failed");
            }
        };
        
        
    };
    
})();