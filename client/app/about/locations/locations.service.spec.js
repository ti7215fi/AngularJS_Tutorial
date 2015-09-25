/**
 * @namespace Test
 * @description Test of the locationhandler Service
 */
(function () {

    describe('Test locationhandler Factory', function () {

        var locationHandler, $httpBackend, distances, $rootScope;

        //load the core-module for the routerHelper
        beforeEach(module('app.core'));

        //load the about-module to test this factory
        beforeEach(module('app.about'));

        //mock the constants
        beforeEach(module(function ($provide) {

            var mockL = {
                LatLng: function Constr() {
                    return Constr;
                }
            };

            var mockMap = {
                setView: function () {
                    return 0;
                }
            };

            $provide.constant('L', mockL);
            $provide.constant('map', mockMap);
        }));

        //mock the services
        beforeEach(inject(function ($injector) {

            $httpBackend = $injector.get('$httpBackend');
            locationHandler = $injector.get('locationHandler');
            distances = $injector.get('distances');
            $rootScope = $injector.get('$rootScope');

        }));

        //verify the $httpBackend-Service
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should have a "distances" variable initialized with an empty array', function () {

            expect(locationHandler.getDistances()).toEqual([]);

        });

        it('should initialize an variable called "locations" in the rootScope', function () {

            var response = ['Erfurt', 'Jena', 'Weimar'];

            $httpBackend.expectGET('/location').respond(200, response);
            locationHandler.getLocations();
            $httpBackend.flush();

            expect($rootScope.locations.length >= 3).toBe(true);

        });

        it('should init the "distances" variable with some value', function () {

            var city = "Erfurt";
            var response = [
                {
                    city: "Erfurt",
                    geoData : {
                    coordinates: [
                        50.023937,
                        11.393272
                    ]
                }
                },
                {
                    city: "Jena",
                    geoData : {
                    coordinates: [
                        51.203922,
                        11.548326
                    ]
                }
                },
                {
                    city: "Weimar",
                    geoData : {
                    coordinates: [
                        50.182256,
                        11.483252
                    ]
                }
                }
            ];

            $rootScope.locations = response;
            distances = ['Erfurt', 'Jena', 'Weimar'];
            var coordinates = locationHandler.changeCity(city);

            expect(coordinates).toEqual(response[0].geoData.coordinates);

        });


    });//end describe

})();
