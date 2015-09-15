/**
 * @namespace Controller
 * @description Gibt ausgelesene Pizzen an die View weiter
 * 
 */
(function () {
    'use strict';

    angular
            .module('app')
            .controller('ArticlesController', ArticlesController);

    ArticlesController.$inject = ['carthandler', '$http', 'articlehandler'];
    
    /**
     * 
     * @param {type} carthandler
     * @param {type} $http
     * @returns {articles.controller_L6.ArticlesController}
     */
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
            $http.get('/pizzen').then(function (articleResponse) {
                
                
                for(var articleIndex = 0; articleIndex < articleResponse.data.length; ++articleIndex){
                    articleResponse.data[articleIndex].edit = false;
                }
                
                vm.cart = carthandler;
                vm.articles = articleResponse.data;
            });
        };
    };
})();