/**
 * @namespace Test
 * @description Test of the loginHandler Service
 */
(function () {

    'use strict';

    var $httpBackend, $rootScope, loginHandler, $state;

    describe('Test the loginHandler-Factory', function () {

        //load the core module for the routerHelper
        beforeEach(module('app.core'));
        //load the login module for testing it
        beforeEach(module('app.login'));
        //mock the 'user' constant
        beforeEach(module(function ($provide) {
            $provide.value('user', null);
        }));
        //set up the mock services
        beforeEach(inject(function ($injector) {
            // set up the http mock service
            $httpBackend = $injector.get('$httpBackend');
            // set up the rootScope service
            $rootScope = $injector.get('$rootScope');
            //set up the carthandler mock factory
            loginHandler = $injector.get('loginHandler');
            //set up the $state service
            $state = $injector.get('$state');
            
            spyOn($state, 'go').and.callFake( function(){ return 0 });

            console.log(loginHandler);
        }));

        //verify the $httpBackend-Service
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should initialize the rootScope-variable "userSession"', function () {

            var userData = {
                id: 1,
                firstname: "Max",
                lastname: "Mustermann"

            };

            var login = {username: "MaxMu", password: 123123, delete : false};
            $httpBackend.expectPOST('/sessionData', login).respond(200, 'POST successful');
            $httpBackend.expectGET('/sessionData').respond(200, userData);
            loginHandler.authentication("MaxMu", 123123);
            $httpBackend.flush();

            expect($rootScope.userSession).toBeDefined();
            expect($rootScope.userSession.id).toEqual(userData.id);
            expect($rootScope.userSession.firstname).toEqual(userData.firstname);
            expect($rootScope.userSession.lastname).toEqual(userData.lastname);

        });

        it('should return some userData', function () {

            var userData = {
                id: 1,
                firstname: "Max",
                lastname: "Mustermann"

            };

            var login = {username: "MaxMu", password: 123123, delete : false};
            $httpBackend.expectPOST('/sessionData', login).respond(200, 'POST successful');
            $httpBackend.expectGET('/sessionData').respond(200, userData);
            loginHandler.authentication("MaxMu", 123123);
            $httpBackend.flush();

            expect(loginHandler.getUserInformation().id).toEqual(userData.id);
            expect(loginHandler.getUserInformation().firstname).toEqual(userData.firstname);
            expect(loginHandler.getUserInformation().lastname).toEqual(userData.lastname);

        });

        it('should initialize the rootScope-variable "userSession" with null', function () {

            $httpBackend.expectPOST('/sessionData', { delete : true }).respond(200, '');
            loginHandler.logout();
            $httpBackend.flush();

            expect($rootScope.userSession).toBe(null);

        });

    });

})();

