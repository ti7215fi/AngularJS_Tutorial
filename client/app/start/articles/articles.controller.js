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

    ArticlesController.$inject = ['carthandler', 'articlehandler', 'pizzaResource'];

    function ArticlesController(carthandler, articlehandler, pizzaResource)
    {
        var vm = this;

        vm.articleHandler = articlehandler;

        activate();

        vm.refreshArticles = function () {
            activate();
        };

        /////////////////////

        function activate() {

            var response = pizzaResource.getPizza();

            response.$promise.then(function (result) {
                
                for (var articleIndex = 0; articleIndex < result.length; ++articleIndex) {
                    result[articleIndex].edit = false;
                }

                vm.articles = result;
                vm.cart = carthandler;
            })

        }
    }
})();