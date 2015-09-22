/**
 * @namespace Test
 * @description Test of the LocationController
 */
(function () {

    'use strict';

    describe('Test LocationController', function () {

        var controller, $rootScope, $httpBackend;

        //load core-module for the routerHelper
        beforeEach(module('app.core'));

        //load about-module to test this controller
        beforeEach(module('app.about'));
        
        //mock constants
        beforeEach(module(function($provide){
            $provide.constant('L', { Map : function(){return "zero";} });
            $provide.constant('map', {});
        }));

        //mock the services
        beforeEach(inject(function ($injector) {

            var $controller     = $injector.get('$controller');
            var locationHandler = $injector.get('locationHandler');
            
            $rootScope          = $injector.get('$rootScope');
            $httpBackend        = $injector.get('$httpBackend');
            

      
            controller          = $controller('LocationController', {
                locationHandler: locationHandler
            });

        }));

        //verify the $httpBackend-Service
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        it('should be have an defined loc variable', function () {

            expect(controller.loc).toBeDefined(true);

        });

        it('should be have an existing changeCity-function', function () {

            expect(angular.isFunction(controller.loc.changeCity)).toBe(true);

        });

        it('should be have an existing getDistances-function', function () {

            expect(angular.isFunction(controller.loc.getDistances)).toBe(true);

        });

        it('should be have an initialized $rootScope variable named "locations", after HTTP_GET', function () {

            $httpBackend.expectGET('/locations').respond(200, ['Erfurt', 'Jena', 'Weimar']);
            $httpBackend.flush();

            expect($rootScope.locations.length > 0).toBe(true);

        });

    });
})();








