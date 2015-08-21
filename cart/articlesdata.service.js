(function ()
{
    'use strict'

    angular
            .module('tutorialApp')
            .factory('articlesdata', articlesdata);
    
    articlesdata.$inject = ['$http', 'carthandler', '$rootScope'];

    /* @ngInject */
    function articlesdata($http, carthandler, $rootScope)
    {
        return{
            getArticles : getArticles
        };
        //////////////////////////////
        
        function getArticles() {
            $http.get('/pizzen').then(function (articleResponse) {
                console.log(articleResponse);
                $rootScope.cart = carthandler;
                $rootScope.articles = articleResponse.data;
            });
        }
    }
})();

