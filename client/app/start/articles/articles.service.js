(function(){
    
    'use strict';
    
    angular
            .module('app')
            .factory('articlehandler', articlehandler)
            .value('edit', false);
            
    
    articlehandler.$inject = ['$http', 'edit'];
    
    function articlehandler($http, edit){
      
        var actions = {
            
            deleteArticle : deleteArticle,
            editArticle : editArticle,
            setEdit : setEdit,
            getEdit : getEdit
            
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
                
            };
            
            function errorHandler(){
              
                console.log('POST /deleteArticle failed!');
                
            };
            
        };
        
        function editArticle(name, price, article){
          
          console.log('name: %s , price: %s, id: %i', name, price, article._id);
          
          var article = { 
              _id : article._id,
              name : name,
              price : price
          };
          
            $http.post('/editArticle', article)
                    .success(successHandler)
                    .error(errorHandler)
            
            //////////////////////////////////
            
            
            function successHandler(){
              
              console.log('Edit article %s successful!', article);
                
            };
            
            function errorHandler(){
                
              console.log('POST /editArticle failed!');
                
            };
            
        };
        
        function getEdit(){
            return edit;
        };
        
        function setEdit(value){
            edit = value;
        };
        
    };
    
})();
