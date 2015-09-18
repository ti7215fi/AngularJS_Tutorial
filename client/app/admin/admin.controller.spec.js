
/**
 * @namespace Test
 * @description Testet den AdminController
 */
(function(){
    
    describe('AdminController', function(){
   
   var controller;
   
   beforeEach(module('app.admin'));
   
   beforeEach(inject(function(_$controller_, _adminHandler_, _$modal_){
       var $controller = _$controller_;
       var adminHandler = _adminHandler_;
       var $modal = _$modal_;
       
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



