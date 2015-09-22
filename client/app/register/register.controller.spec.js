/**
 * @namespace Test
 * @description Test of the RegisterController
 */
(function(){
    
    'use strict';
    
    describe('Test the RegisterController', function(){
       
       var registerhandler, controller;
       
       //load the core module for the routerHelper
        beforeEach(module('app.core'));
        
        //load the register module to test this controller
        beforeEach(module('app.register'));
        
        //mock the services
        beforeEach(inject(function($injector){
            
            //mock the registerfactory
            registerhandler = $injector.get('registerhandler');
            //mock the controller
            var $controller = $injector.get('$controller');
            controller = $controller('RegisterController', { registerhandler : registerhandler });
            
        }));
        
        it('should have a register-variable in the scope', function(){
            expect(controller.register).toBeDefined();
            expect(controller.register).toEqual(registerhandler);
        });
        
        it('should have a register-variable in the scope', function(){
            expect(controller.registerModel).toBeDefined();
            expect(controller.registerModel).toEqual({});
        });
        
        it('should have a "saveRegistration" function', function(){
           expect(controller.register.saveRegistration).toBeDefined(); 
        });
        
        it('should have a "abort" function', function(){
           expect(controller.register.abort).toBeDefined(); 
        });
        
    });
    
})();
