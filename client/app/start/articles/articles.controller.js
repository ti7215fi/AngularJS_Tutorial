/**
 * @namespace Controller
 * @description Control the data of the pizza.
 * 
 */
(function () {
    'use strict';

    angular
            .module('app.start')
            .controller('ArticlesController', ArticlesController);

    ArticlesController.$inject = ['carthandler', '$http', 'articlehandler'];
    
    function ArticlesController(carthandler, $http, articlehandler)
    {
        var vm = this;
  
        vm.articleHandler = articlehandler;
        
        activate();
        
        vm.refreshArticles = function(){
            activate();
        };
        
        /////////////////////
        
        function activate() {
            $http.get('/pizzen')
                    .success(successHandler)
                    .error(errorHandler);
            
            ////////////////////////////////
            
            function successHandler(articleResponse){
                
                for(var articleIndex = 0; articleIndex < articleResponse.length; ++articleIndex){
                    articleResponse[articleIndex].edit = false;
                }
                
                vm.cart = carthandler;
                vm.articles = articleResponse;
            }
            
            function errorHandler(errorResponse){
                console.log(errorResponse);
            }
          
        }
    }
})();