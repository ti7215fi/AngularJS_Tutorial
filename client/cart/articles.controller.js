/**
 * @namespace Controller
 * @description Gibt ausgelesene Pizzen an die View weiter
 * 
 */
(function () {
    'use strict';

    angular
            .module('tutorialApp')
            .controller('ArticlesController', ArticlesController);

    ArticlesController.$inject = ['carthandler', '$http'];
    
    /**
     * 
     * @param {type} carthandler
     * @param {type} $http
     * @returns {articles.controller_L6.ArticlesController}
     */
    function ArticlesController(carthandler, $http)
    {
        var vm = this;
        
        activate();
        
        /////////////////////
        
        function activate() {
            $http.get('/pizzen').then(function (articleResponse) {
                vm.cart = carthandler;
                vm.articles = articleResponse.data;
            });
        };
    };
})();