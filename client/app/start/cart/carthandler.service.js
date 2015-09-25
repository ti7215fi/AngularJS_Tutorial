/**
 * @namespace Service
 * @description Organize and verify the data of the shoppingcart.
 */
(function () {
    'use strict';

    angular
            .module('app.start')
            .factory('carthandler', carthandler)
            .value('items', []);


    carthandler.$inject = ['userResource', 'items', '$rootScope', '$modal'];

    /**
     * 
     * @param {type} userResource
     * @param {type} items
     * @param {type} $rootScope
     * @param {type} $modal
     * @returns {carthandler.service_L6.carthandler.actions}
     */
    function carthandler(userResource, items, $rootScope, $modal) {

        var actions = {
            getItems: getItems,
            getItemByID: getItemByID,
            getLength: getLength,
            getArticleCount: getArticleCount,
            addArticle: addArticle,
            deleteArticles: deleteArticles,
            sum: sum,
            insertOrderIntoDatabase: insertOrderIntoDatabase
        };
        return actions;
        ////////////////

        function getItems()
        {
            return items;
        }

        function getItemByID(ID)
        {
            return items[ID];
        }

        function getLength()
        {
            return items.length;
        }

        function getArticleCount()
        {
            var count = 0;

            for (var Index = 0; Index < items.length; ++Index)
            {
                count += items[Index].quantity;
            }

            return count;
        }

        function addArticle(article) {

            var found = false;
            var indexOfItem;

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
        }


        function deleteArticles() {
            items.length = 0;
        }

        function sum()
        {
            var sum = 0.00;

            for (var Index = 0; Index < items.length; ++Index)
            {
                (items[Index].price).substr(0, (items[Index].price).length - 1);
                sum += (parseFloat(items[Index].price)) * items[Index].quantity;
            }

            return sum;
        }

        function insertOrderIntoDatabase()
        {
            
            if ($rootScope.userSession !== null) {

                var data = getItems();

                userResource.update(data).$promise.then(function(){
                   
                    items.length = 0;
                    
                });

            } else {

                $rootScope.registerPopup = $modal.open({
                    templateUrl: '/static/app/register/registerpopup.view.html',
                    controller: 'RegisterController',
                    controllerAs: 'vm'
                });

            }

        }
    }
})();
