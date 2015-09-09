/**
 * @namespace Test
 * @description Testet den carthandler Service
 */
(function(){
    
    describe('carthandler tests', function (){
  var carthandler;
  var items;

  beforeEach(function (){
    
    module('app');
    
    module(function($provide){
        
    $provide.value('substr', 
                  { substr : function(){ return "5.50" }}
                  );
    });  
    
    inject(function(_carthandler_, _items_) {
        carthandler = _carthandler_;
        items = _items_;
    });

  });
    
  it('should have an exciteText function', function () { 
    expect(angular.isFunction(carthandler.getLength)).toBe(true);
  });
  
  it('should have an empty item array', function(){
     expect(carthandler.getLength()).toEqual(0); 
  });
  
  it('should have an empty item array', function(){
     expect(carthandler.getItems()).toEqual([]); 
  });
  
  it('shoulde have an initialized item array', function(){
     var item = { name : 'Pizza Salami', quantity : 2, price : 5.0 };
     
     carthandler.addArticle(item);
     
     expect(carthandler.getLength()).toEqual(1);    
  });
  
  it('should have an array with the size of 1', function(){
     var item = { name : 'Pizza Salami', quantity : 2, price : 5.0 };
     var item2 = { name : 'Pizza Salami', quantity : 3, price : 5.0 };

     carthandler.addArticle(item);
     carthandler.addArticle(item2);
     
     expect(carthandler.getLength()).toEqual(1);    
  });
  
   it('should have an array with the size of 2', function(){
     
     
     
     var item            = { name : 'Pizza Salami', quantity : 2.0, price : 5.0 }; 
     var item2           = { name : 'Pizza Pilze', quantity : 3.0, price : 5.0 };

     carthandler.addArticle(item);
     carthandler.addArticle(item2);
     
     
     
     expect(carthandler.getLength()).toEqual(2);    
  });
  
  
   it('should have an count of 3', function(){
     
     carthandler.deleteArticles();
     
     var item            = { name : 'Pizza Salami',  price : 5.0 }; 
     var item2           = { name : 'Pizza Pilze',  price : 5.0 };
     var item3           = { name : 'Pizza Salami', price : 5.0 };

     carthandler.addArticle(item);
     carthandler.addArticle(item2);
     carthandler.addArticle(item3);
     
     expect(carthandler.getArticleCount()).toEqual(3);    
  });
  
  it('should have an array of 2 items', function(){
     
     carthandler.deleteArticles();
     
     var item            = { name : 'Pizza Salami',  price : 5.0 }; 
     var item2           = { name : 'Pizza Pilze',  price : 5.0 };
     var item3           = { name : 'Pizza Salami', price : 5.0 };
     
     carthandler.addArticle(item);
     carthandler.addArticle(item2);
     carthandler.addArticle(item3);
      
     expect(carthandler.getItems()).toEqual([{ name : 'Pizza Salami', price : 5.0, quantity : 2}, 
                                             { name : 'Pizza Pilze',  price : 5.0, quantity : 1 }]); 
  });
  
  it('should have an empty array', function(){
     
     var item            = { name : 'Pizza Salami',  price : 5.0 }; 
     var item2           = { name : 'Pizza Pilze',  price : 5.0 };
     var item3           = { name : 'Pizza Salami', price : 5.0 };
     
     carthandler.addArticle(item);
     carthandler.addArticle(item2);
     carthandler.addArticle(item3);
     
     carthandler.deleteArticles();
      
     expect(carthandler.getLength()).toEqual(0); 
  });
  
    it('should have an sum of 15', function(){
       
     var item            = { name : 'Pizza Salami',  price : '5.00€' }; 
     var item2           = { name : 'Pizza Pilze',  price : '5.00€' };
     var item3           = { name : 'Pizza Salami', price : '5.00€' };
     
     carthandler.addArticle(item);
     carthandler.addArticle(item2);
     carthandler.addArticle(item3);
      
     expect(carthandler.sum()).toEqual(15.0); 
  });

  
});
    
    
})();

