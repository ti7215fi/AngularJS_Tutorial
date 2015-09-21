/**
 * @namespace Test
 * @description Test the registerhandler factory
 */
(function(){
    
    'use strict';
    
    describe('Test the registerhandler', function(){
       
       var $rootScope, $httpBackend, registerhandler;
       
       //load the core-module for the routerHelper
        beforeEach(module('app.core'));
        
        //load the register-module to test this factory
        beforeEach(module('app.register'));
        
        //mock the services
        beforeEach(inject(function($injector){
            //mock rootScope service
            $rootScope = $injector.get('$rootScope');
            //mock the http service
            $httpBackend = $injector.get('$httpBackend');
            //mock the registerhandler factory
            registerhandler = $injector.get('registerhandler');
            
        }));
        
        //verify the $httpBackend-Service
        afterEach(function(){
            $httpBackend.verifyNoOutstandingExpectation;
            $httpBackend.verifyNoOutstandingRequest;
        });
        
        it('', function(){
            
 

        });
        
    });
    
})();