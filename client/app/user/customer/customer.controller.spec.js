/**
 * @namespace Test
 * @description Test of the CustomerController.
 */
(function(){
    
    'use strict';
    
    var customerAreaHandler, controller;
    
    describe('Test the CustomerController', function(){
       
       //load the core module for the routerHelper
        beforeEach(module('app.core'));
        
        //load the module to test ist
        beforeEach(module('app.user.customer'));
        
        //use the injector to mock the services
        beforeEach(inject(function($injector){
            //set up the customerAreaHandler-Factory
            customerAreaHandler = $injector.get('customerAreaHandler');
            //set up the $controller service
            var $controller = $injector.get('$controller');
            controller = $controller('CustomerController', { customerAreaHandler : customerAreaHandler });
        }));
        
        it('should have a variable "customerArea" in the scope', function(){
            expect(controller.customerArea).toBeDefined();
        });
        
        it('should have a variable "customerModel" in the scope', function(){
            expect(controller.customerModel).toBeDefined();
        });
        
        it('should have a variable "customerArea" initialized with the customerAreaHandler-object', function(){
            expect(controller.customerArea).toEqual(customerAreaHandler);
        });
        
        it('should have a variable "customerModel" initialized with an empty object', function(){
            expect(controller.customerModel).toEqual({});
        });
        
        it('should have a function called "getCustomerData"', function(){
            expect(controller.customerArea.getCustomerData).toBeDefined(); 
        });
        
        it('should have a function called "updateUsername"', function(){
            expect(controller.customerArea.updateUsername).toBeDefined(); 
        });
        
        it('should have a function called "updateAddress"', function(){
            expect(controller.customerArea.updateAddress).toBeDefined(); 
        });
        
        it('should have a function called "updatePassword"', function(){
            expect(controller.customerArea.updatePassword).toBeDefined(); 
        });
        
        it('should have a function called "deleteCustomer"', function(){
            expect(controller.customerArea.deleteCustomer).toBeDefined(); 
        });
        
        it('should have a function called "getOrder"', function(){
            expect(controller.customerArea.getOrder).toBeDefined(); 
        });
        
    });
    
})();