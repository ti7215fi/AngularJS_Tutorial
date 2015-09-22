/**
 * @namespace Test
 * @description Test of the AdminController
*/
(function(){
    
    describe('AdminController', function(){
   
   var controller, $modal;
   
   //load the core-module for the routerHelper
   beforeEach(module('app.core'));
   
   //load the admin-module to test this controller
   beforeEach(module('app.user.admin'));
   
   //mock the modal service
   beforeEach(module(function($provide){
       
       $provide.service('$modal', function(){});
       
   }));
   
   //mock the services
   beforeEach(inject(function($injector){
       
       var $controller = $injector.get('$controller');
       var adminHandler = $injector.get('adminHandler');
       $modal = $injector.get('$modal');
       
       controller = $controller('AdminController', { adminHandler : adminHandler });
       
   }));
   
   it('should be have an defined admin variable', function(){
       expect(controller.admin).toBeDefined();
   });
   
   it('should be have an function to save an image', function(){
       expect(angular.isFunction(controller.admin.saveImage)).toBe(true);
   });
   
   it('should be have an function to save an location', function(){
       expect(angular.isFunction(controller.admin.saveLocation)).toBe(true);
   });
    
});

    
    
})(); 



