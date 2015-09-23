/**
 * @namespace Service
 * @description Organize and verify the data of the pizza.
 */
(function(){
    
    'use strict';
    
    angular
            .module('app.start')
            .factory('articlehandler', articlehandler);
            
    
    articlehandler.$inject = ['pizzaResource'];
    
    function articlehandler(pizzaResource){
      
        var actions = {
            
            deleteArticle : deleteArticle,
            editArticle : editArticle            
        };
        return actions;
        
        //////////////////////////////////
        
        
        function deleteArticle(article){
          
          pizzaResource.deletePizzaById(article._id);
            
        }
        
        function editArticle(name, price, article){
          
          console.log('name: %s , price: %s, id: %i', name, price, article._id);
          
          var postArticle = { 
              _id : article._id,
              name : name,
              price : price
          };
          
            $resource('/editArticle').save(postArticle,
                    successHandler,
                    errorHandler);
            
            //////////////////////////////////
            
            
            function successHandler(){
              
              console.log('Edit article %s successful!', article);
                
            }
            
            function errorHandler(){
                
              console.log('POST /editArticle failed!');
                
            }
            
        }
        
    }
    
})();
