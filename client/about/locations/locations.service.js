(function(){
    
    'use strict';
    
    angular
            .module('tutorialApp')
            .factory('locationHandler', locationHandler);
    
    locationHandler.$inject = ['$http', '$rootScope'];
    
    function locationHandler($http, $rootScope){
      
        var city ;
        var distances = [];
        var coordinates = [];
        var map;
        var icon = L.icon({ iconUrl: 'about/locations/marker/pizza_marker.png',
                            iconSize: [64, 64],
                          });
        
        var actions = {
            setLocation : setLocation,
            getLocations : getLocations,
            getDistance : getDistance,
            getCity     : getCity,
            changeCity : changeCity,
            getDistances : getDistances,
            initMap         : initMap
        };
        return actions;
        
        /////////////////////////////
        
        function initMap(){
            map = new L.Map('map');

            // create the tile layer with correct attribution
            var osmUrl      ='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            var osmAttrib   ='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
            var osm         = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 18, attribution: osmAttrib});

            map.setView(new L.LatLng(50.9752, 11.0637),12);
            map.addLayer(osm);
            
            var marker1 = L.marker([50.969975, 11.017321], {icon : icon}).addTo(map);
            marker1.bindPopup("<b>Pizzeria 404!</b><br>Teststrasse 1, 99085 Erfurt.")
            var marker2 = L.marker([51.001504, 11.029476], {icon : icon}).addTo(map);
            marker2.bindPopup("<b>Pizzeria 404!</b><br>Teststrasse 2, 99084 Erfurt.")
        };
        
        
        function changeMapView(){
            map.setView(new L.LatLng(coordinates[1], coordinates[0]));
        };
        
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
            showMap = true;
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
                
                console.log("distances ", distances);
                
                for(var index = 0; index < distances.length; ++ index){
                  
                    if(distances[index].city === city){
                        coordinates[0] = distances[index].coordinates[0];
                        coordinates[1] = distances[index].coordinates[1];
                        delete distances[index];
                        break;
                    }
                    
                };
                
                changeMapView();
                
                console.log("POST /getLocation successful!");
            }
            
            function errorHandler(){
                console.log("POST /getLocation failed");
            }
        };
        
        
    };
    
})();