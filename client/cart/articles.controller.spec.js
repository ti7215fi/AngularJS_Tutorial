describe('Test ArticlesController', function(){
    
    var controller;
    var $httpBackend; 
    
   beforeEach(function(){
      
       module('tutorialApp');
       
       inject(function(_$controller_, _carthandler_, _$httpBackend_){
          
           var $controller = _$controller_;
           var carthandler = _carthandler_;
               $httpBackend = _$httpBackend_;
           
           controller = $controller('ArticlesController', { carthandler : carthandler});
           
       });
       
   });
    
   it('should have an defined articles variable', function(){
      $httpBackend.expectGET('/pizzen').respond(200, '');
      $httpBackend.flush();
      expect(controller.articles).toBeDefined(true);
   });
    
   it('should have an defined cart variable', function(){
      $httpBackend.expectGET('/pizzen').respond(200, '');
      $httpBackend.flush();
      expect(controller.cart).toBeDefined(true);
   });
    
});

