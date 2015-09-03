describe('CartController', function(){

    beforeEach(module('tutorialApp'));
    
    var cartController;
    
    beforeEach(inject(function($controller, cart){
        
        mockCart = cart;
        spyOn(mockCart, 'actions').andCallThrough();
        cartController = $controller('CartController'), {
            cart : mockCart
        }; 
        
    }));
   
    
    it('the number of items should be 0', function(){
        expect(cartController.cart.getLength()).toEqual(0);
    });
    
    
});