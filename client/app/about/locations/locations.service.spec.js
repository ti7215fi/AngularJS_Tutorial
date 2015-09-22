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
                LatLng : function Constr(){ return Constr; }
            };
            
            var mockMap = {
              
                setView : function(){return 0;}
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

        it('should have a "distances" variable initialized with an empty array', function(){
           
            expect(locationHandler.getDistances()).toEqual([]);
            
        });
        
        it('should initialize an variable called "locations" in the rootScope', function(){
            
            var response =  ['Erfurt', 'Jena', 'Weimar'];
            
            $httpBackend.expectGET('/locations').respond(200,response);
            locationHandler.getLocations();
            $httpBackend.flush();
            
            var expectedValue = [
                { city : 'Erfurt'   },
                { city : 'Jena'     },  
                { city : 'Weimar'   }  
            ];
            
            expect($rootScope.locations).toEqual(expectedValue);
            
        });
        
        it('should init the "distances" variable with some value', function(){
           
           var city = "Erfurt";
           var response = [
               {
                   city : "Erfurt",
                   coordinates : [
                       50.023937,
                       11.393272
                   ]
               },
               {
                   city : "Jena",
                   coordinates : [
                       51.203922,
                       11.548326
                   ]
               },
               {
                   city : "Weimar",
                   coordinates : [
                       50.182256,
                       11.483252
                   ]
               }
           ];
           
            $httpBackend.expectPOST('/getLocation', { location : city } ).respond(200, response);
            locationHandler.changeCity(city);
            $httpBackend.flush();
            
            expect(locationHandler.getDistances()).toEqual([
                ,
                {
                   city : "Jena",
                   coordinates : [
                       51.203922,
                       11.548326
                   ]
               },
               {
                   city : "Weimar",
                   coordinates : [
                       50.182256,
                       11.483252
                   ]
               }
            ]);
            
        });


    });//end describe

})();
