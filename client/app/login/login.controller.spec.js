/**
 * @namespace Test
 * @description Test of the LoginController
 */
(function () {

    'use strict';

    describe('Test the LoginController', function () {

        var loginHandler, controller;

        //load the core-module for the routerHelper
        beforeEach(module('app.core'));
        //load the login-module to test
        beforeEach(module('app.login'));
        //mock the 'user'-constant
        beforeEach(module(function($provide){
            $provide.value('user', null);
        }));
        //call the injector to mock the services
        beforeEach(inject(function ($injector) {

            //set up the loginhandler mock factory
            loginHandler = $injector.get('loginHandler');
            //set up the controller
            var $controller = $injector.get('$controller');
            controller = $controller('LoginController', { loginHandler : loginHandler });

        }));
        
        it('should have a "login" variable in the scope (init with the loginhandler)', function(){
           
            expect(controller.login).toBeDefined(true);
            
        });
        
        it('should have a "refresh" variable in the scope', function(){
           
            expect(controller.refresh).toBeDefined(true);
            
        });
        
        it('should have a "username" variable in the scope', function(){
           
           controller.refresh();
            expect(controller.username).toBeDefined(true);
            
        });
        
        it('should have a "password" variable in the scope', function(){
           
            controller.refresh();
            expect(controller.password).toBeDefined(true);
            
        });
        
        it('should have a "username" variable initialized with an empty string', function(){
           
            controller.refresh();
            expect(controller.username).toBe("");
            
        });
        
        it('should have a "password" variable initialized with an empty string', function(){
           
            controller.refresh();
            expect(controller.password).toBe("");
            
        });
        
        it('should have a function called "authentication"', function(){
           
            expect(controller.login.authentication).toBeDefined(true);
            
        });
        
        it('should have a function called "logout"', function(){
           
            expect(controller.login.logout).toBeDefined(true);
            
        });
    });

})();

