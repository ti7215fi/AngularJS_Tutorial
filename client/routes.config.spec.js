
/**
 * 
 * @namespace Test
 */
(function(){
    
    describe('Test Route-Config', function(){
    
   var $route; 
    
   beforeEach(function(){
      
       module('tutorialApp');
       
       inject(function(_$route_){
          
           $route = _$route_;
           
       });
       
   });
   
   it('should route to home', function(){
      
       expect($route.routes['/'].templateUrl).toEqual('cart/articles.html');
       
   });
   
   it('should route to about', function(){
      
      expect($route.routes['/about'].templateUrl).toEqual('about/locations/locations.view.html');
       
   });
   
   it('should route to impressum', function(){
      
      expect($route.routes['/impressum'].templateUrl).toEqual('impressum.view.html');
       
   });
    
   it('should route to login', function(){
      
      expect($route.routes['/login'].templateUrl).toEqual('login/login.view.html');
       
   });

   it('should route to admin', function(){
      
      expect($route.routes['/admin'].templateUrl).toEqual('admin/admin.view.html');
       
   });
   
   it('should route to admin', function(){
      
      expect($route.routes[null].redirectTo).toEqual('/');
       
   });   
    
});
    
})();

