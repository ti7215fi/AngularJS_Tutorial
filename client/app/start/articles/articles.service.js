/**
 * @namespace Service
 * @description Organize and verify the data of the pizza.
 */
(function () {

    'use strict';

    angular
            .module('app.start')
            .factory('articlehandler', articlehandler);


    articlehandler.$inject = ['pizzaResource'];

    function articlehandler(pizzaResource) {

        var actions = {
            deleteArticle: deleteArticle,
            editArticle: editArticle
        };
        return actions;

        //////////////////////////////////


        function deleteArticle(article) {

            pizzaResource.delete({Id: article._id});

        }

        function editArticle(name, price, article) {

            var postArticle = {
                _id: article._id,
                name: name,
                price: price
            };

            pizzaResource.update({Id: article._id}, postArticle);

        }

    }

})();
