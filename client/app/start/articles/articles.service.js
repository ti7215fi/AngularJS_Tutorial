/**
 * @namespace Service
 * @description Organize and verify the data of the pizza.
 */
(function(){
    
    'use strict';
    
    angular
            .module('app.start')
            .factory('articlehandler', articlehandler);
            
    
    articlehandler.$inject = ['$http'];
    
    function articlehandler($http){
      
        var actions = {
            
            deleteArticle : deleteArticle,
            editArticle : editArticle,            
        };
        return actions;
        
        //////////////////////////////////
        
        
        function deleteArticle(article){
          
            $http.post('/deleteArticle', article)
                    .success(successHandler)
                    .error(errorHandler);
            
            
            ////////////////////////////////////
            
            function successHandler(){
              
                console.log('Delete article %s successful', article);
                
            }
            
            function errorHandler(){
              
                console.log('POST /deleteArticle failed!');
                
            }
            
        }
        
        function editArticle(name, price, article){
          
          console.log('name: %s , price: %s, id: %i', name, price, article._id);
          
          var postArticle = { 
              _id : article._id,
              name : name,
              price : price
          };
          
            $http.post('/editArticle', postArticle)
                    .success(successHandler)
                    .error(errorHandler);
            
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
