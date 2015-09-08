
/**
 * 
 * @namespace Test
 */
(function(){
    
    describe('CartController', function(){
    
    var controller;
    
    beforeEach(function(){
        
        module('tutorialApp');
               
        inject(function(_$controller_, _carthandler_){
           
            var $controller = _$controller_;
            var carthandler = _carthandler_;
            
            controller      = $controller('CartController'), {
                                    carthandler : carthandler
                                };  
        });
        
    });
      
    it('should have an cart variable', function(){
        expect(controller.cart).toBeDefined(true);
    });
    
    it('should have an getItems function', function(){
        expect(angular.isFunction(controller.cart.getItems)).toBe(true);
    });
    
    it('should have an sum function', function(){
        expect(angular.isFunction(controller.cart.sum)).toBe(true);
    });
    
    it('should have an getArticleCount function', function(){
        expect(angular.isFunction(controller.cart.getArticleCount)).toBe(true);
    });
    
    it('should have an insertOrderIntoDatabase function', function(){
        expect(angular.isFunction(controller.cart.insertOrderIntoDatabase)).toBe(true);
    });
    
    it('should have an deleteArticles function', function(){
        expect(angular.isFunction(controller.cart.deleteArticles)).toBe(true);
    });
    
    it('', function(){
        
    });
    
    
});
    
    
})();

