/**
 * @namespace Test
 * @description Test the loginHandler Service
 */
(function(){
    
    'use strict';
    
    var $httpBackend, $rootScope, loginHandler;
    
    describe('Test the loginHandler-Factory', function(){
        
       //load the core module for the routerHelper
       beforeEach(module('app.core'));
       //load the login module for testing it
       beforeEach(module('app.login'));
       //mock the 'user' constant
       beforeEach(module(function($provide){
           $provide.value('user', null);
       }));
       //set up the mock services
       beforeEach(inject(function($injector){
          // set up the http mock service
           $httpBackend = $injector.get('$httpBackend');
           // set up the rootScope service
           $rootScope   = $injector.get('$rootScope');
           //set up the carthandler mock factory
           loginHandler = $injector.get('loginHandler');
           
           console.log(loginHandler);
       }));
       
       it('should initialize the rootScope-variable "userSession"', function(){
          
          var userData = { 
               id: 1,
               firstname : "Max",
               lastname : "Mustermann"
    
           };
          
          var login = { username : "MaxMu", password : 123123 };
           $httpBackend.expectPOST('/login', login).respond(200, 'POST successful');
           $httpBackend.expectGET('/getUserData').respond(200, userData);
           loginHandler.authentication("MaxMu", 123123);
           $httpBackend.flush();
          
          expect($rootScope.userSession).toBeDefined();
          expect($rootScope.userSession).toEqual(userData);
       });
       
        it('should return some userData', function(){
          
          var userData = { 
               id: 1,
               firstname : "Max",
               lastname : "Mustermann"
    
           };
          
          var login = { username : "MaxMu", password : 123123 };
           $httpBackend.expectPOST('/login', login).respond(200, 'POST successful');
           $httpBackend.expectGET('/getUserData').respond(200, userData);
           loginHandler.authentication("MaxMu", 123123);
           $httpBackend.flush();
          
          expect(loginHandler.getUserInformation()).toEqual(userData);
       });
       
       it('should initialize the rootScope-variable "userSession" with null', function(){
          
           $httpBackend.expectGET('/logout').respond(200, '');
           loginHandler.logout();
           $httpBackend.flush();
           
           expect($rootScope.userSession).toBe(null);
           
       });
        
    });
    
})();

