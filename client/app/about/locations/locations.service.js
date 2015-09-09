/**
 * @namespace Factories
 * @description Service der die Daten der Orte bereitstellt und die Map (Leaflet) initialisiert.
 */
(function(){
    
    'use strict';
    
    angular
            .module('app')
            .factory('locationHandler', locationHandler)
            .value('distances', [])
 
    
    locationHandler.$inject = ['$http', '$rootScope', 'map', 'L', 'distances'];
    
    function locationHandler($http, $rootScope, map, L, distances){
        
        var actions = {
            getLocations    : getLocations,
            changeCity      : changeCity,
            getDistances    : getDistances,
            initMap         : initMap
        };
        return actions;
        
        /////////////////////////////
        
        function initMap(){
            
            if(map.length === 0 )
            {
            
            map = new L.Map('map');
            
            var icon = L.icon({ iconUrl: 'static/app/about/locations/marker/pizza_marker.png',
                                iconSize: [64, 64],
                              });

            // create the tile layer with correct attribution
            var osmUrl      ='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            var osmAttrib   ='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
            var osm         = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 18, attribution: osmAttrib});


            map.setView(new L.LatLng(50.9752, 11.0637),12);
            map.addLayer(osm);
            
            var marker1 = L.marker([50.969975, 11.017321], {icon : icon}).addTo(map);
            marker1.bindPopup("<b>Pizzeria 404!</b><br>Teststrasse 1, 99085 Erfurt.")
            var marker2 = L.marker([51.001504, 11.029476], {icon : icon}).addTo(map);
            marker2.bindPopup("<b>Pizzeria 404!</b><br>Teststrasse 2, 99084 Erfurt.");
        }
        
            
        };
        
        
        function changeMapView(coordinates){
               map.setView(new L.LatLng(coordinates[1], coordinates[0])); 
        };
        
        
        function getDistances(){
            return distances;
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
        
        function changeCity(city){
            
            console.log("city: ", city);
            
            $http.post('/getLocation', { location : city })
                    .success(successHandler)
                    .error(errorHandler);
            
            ////////////////////////////////////
            
            function successHandler(response){
                distances = response;
                var coordinates = [];
                
                console.log("distances ", distances);
                
                for(var index = 0; index < distances.length; ++ index){
                  
                    if(distances[index].city === city){
                        coordinates[0] = distances[index].coordinates[0];
                        coordinates[1] = distances[index].coordinates[1];
                        delete distances[index];
                        break;
                    }
                    
                };
                
                
                changeMapView(coordinates);
                
                console.log("POST /getLocation successful!");
            }
            
            function errorHandler(){
                console.log("POST /getLocation failed");
            }
        };
        
        
    };
    
})();