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

    ArticlesController.$inject = ['articlesdata'];
    
    /**
     * @ngInject
     * @param {type} articlesdata
     * @returns {articles.controller_L6.ArticlesController}
     */
    function ArticlesController(articlesdata)
    {
        activate();
        
        /////////////////////
        
        function activate(){
            return articlesdata.getArticles();
        }
    };
})();