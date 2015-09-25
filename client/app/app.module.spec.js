/**
 * @namespace: Test
 * @description Test the 'app' module
 */
(function () {

    'use strict';

    describe('app Modul', function () {

        var $httpBackend;
        var $rootScope, $state;

        //set up the module
        beforeEach(module('app'));

        //set up the mock services
        beforeEach(inject(function ($injector) {
            //set up the http mock service
            $httpBackend = $injector.get('$httpBackend');
            //set up the rootScope mock service
            $rootScope = $injector.get('$rootScope');
            //set up the $state mock service
            $state = $injector.get('$state');
            
            spyOn($state, 'go').and.callFake(function(){ return 0 });

        }));

        //verify the $httpBackend-Service
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should have a "userSession" variable in the rootScope', function () {
            $httpBackend.expectGET('/sessionData').respond(200, {
                id: 1,
                firstname: "Max",
                lastname: "Mustermann"});
            $httpBackend.flush();
            expect($rootScope.userSession).toBeDefined(true);
        });

        it('should have a "userSession" (init with null)', function () {

            $httpBackend.expectGET('/sessionData').respond(200, { message : "string" });
            $httpBackend.flush();
            expect($rootScope.userSession).toBe(null);

        });

        it('should throw an error and "userSesson"-variable to be undefined', function () {

            $httpBackend.expectGET('/sessionData').respond(500, "");
            $httpBackend.flush();
            expect($rootScope.userSession).toBe(undefined);
        });
    });

})();