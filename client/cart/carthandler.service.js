
/**
 * Carthandler Factory
 * @namespace Factories
 */
(function () {
    'use strict';

    angular
            .module('tutorialApp')
            .factory('carthandler', carthandler);

    /**
     * @description Gibt Funktionen und Methoden für den Warenkorb aus
     * @returns {carthandler.service_L6.carthandler.actions}
     */        
    function carthandler() {
        var items = [];

        var actions = {
            getItems: getItems,
            getItemByID: getItemByID,
            getLength: getLength,
            addArticle: addArticle,
            deleteArticles: deleteArticles,
            sum: sum
        };
        return actions;
        ////////////////

        function getItems()
        {
            return items;
        };

        function getItemByID(ID)
        {
            return items[ID];
        };

        function getLength()
        {
            return items.length;
        };

        function addArticle(article) {
            var found = false;
            var indexOfItem;

            console.log("Artikel", article);

            for (var Index = 0; Index < items.length; ++Index)
            {
                if (items[Index].name === article.name)
                {
                    found = true;
                    indexOfItem = Index;
                    break;
                }
            }

            if (!found)
            {
                items.push(article);
                (items[items.length - 1]).quantity = 1;
            }
            else
            {
                (items[indexOfItem]).quantity += 1;
            }
        };


        function deleteArticles() {
            items.length = 0;
        };

        function sum()
        {
            var sum = 0.00;

            for (var Index = 0; Index < items.length; ++Index)
            {
                (items[Index].price).substr(0, (items[Index].price).length - 1);
                sum += (parseFloat(items[Index].price)) * items[Index].quantity;
            }

            return sum;
        };
    };
})();
