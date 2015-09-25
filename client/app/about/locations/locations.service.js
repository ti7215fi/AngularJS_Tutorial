/**
 * @namespace Service
 * @description Service which initialize the map of the thrid party library "Leaflet" and organize the data of the locations.
 */
(function () {

    'use strict';

    angular
            .module('app.about')
            .factory('locationHandler', locationHandler)
            .value('distances', []);

    locationHandler.$inject = ['$rootScope', 'map', 'L', 'distances', 'locationResource'];

    function locationHandler($rootScope, map, L, distances, locationResource) {

        var actions = {
            getLocations: getLocations,
            changeCity: changeCity,
            getDistances: getDistances,
            initMap: initMap
        };
        return actions;

        /////////////////////////////

        function initMap() {

            if (map.length === 0)
            {

                map = new L.Map('map');

                var icon = L.icon({iconUrl: 'static/app/about/locations/marker/pizza_marker.png',
                    iconSize: [64, 64],
                });

                // create the tile layer with correct attribution
                var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
                var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
                var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 18, attribution: osmAttrib});


                map.setView(new L.LatLng(50.9752, 11.0637), 12);
                map.addLayer(osm);

                var marker1 = L.marker([50.969975, 11.017321], {icon: icon}).addTo(map);
                marker1.bindPopup("<b>Pizzeria 404!</b><br>Teststrasse 1, 99085 Erfurt.");
                var marker2 = L.marker([51.001504, 11.029476], {icon: icon}).addTo(map);
                marker2.bindPopup("<b>Pizzeria 404!</b><br>Teststrasse 2, 99084 Erfurt.");
            }


        }


        function changeMapView(coordinates) {
            map.setView(new L.LatLng(coordinates[1], coordinates[0]));
        }


        function getDistances() {
            return distances;
        }

        function getLocations() {
            
            $rootScope.locations = locationResource.query();
            console.log($rootScope.locations);
        }

        //ToDo: auslesen der locations aus der datenbank, verschieben der auswahl
        function changeCity(city) {

            var locations = $rootScope.locations;
            

            if(locations !== null && locations !== undefined && locations !== {}){
                
                
                for(var distancesIndex = 0; distancesIndex < distances.length; ++distancesIndex){
                    
                    if(distances[distancesIndex].city === city){
                        delete distances[distancesIndex];
                        break;
                    }
                    
                }
                
                for(var locationIndex = 0; locationIndex < locations.length; ++locationIndex){
                    if(locations[locationIndex].city === city){
                        
                        var location = locations[locationIndex].geoData;
                        
                        changeMapView(location.coordinates);
                        return location.coordinates;
                        break;
                    }
                }
                
            }
        }


    }

})();