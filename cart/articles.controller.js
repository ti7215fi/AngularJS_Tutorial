(function () {
    'use strict';

    angular
            .module('tutorialApp')
            .controller('ArticlesController', ArticlesController);

    ArticlesController.$inject = ['articlesdata'];

    /* @ngInject */
    function ArticlesController(articlesdata)
    {
        activate();
        
        /////////////////////
        
        function activate(){
            return articlesdata.getArticles();
        }
    };
})();