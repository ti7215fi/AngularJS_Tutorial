/**
 * Articlesdata Factory
 * @namespace Factories
 */
(function ()
{
    'use strict'

    angular
            .module('tutorialApp')
            .factory('articlesdata', articlesdata);
    
    articlesdata.$inject = ['$http', 'carthandler', '$rootScope'];

    /**
     * @description Gibt alle Pizzen der Datenbank wieder
     * @ngInject
     * @param {type} $http
     * @param {type} carthandler
     * @param {type} $rootScope
     * @returns {articlesdata.service_L5.articlesdata.articlesdata.serviceAnonym$0} Array mit Objekten
     */
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

