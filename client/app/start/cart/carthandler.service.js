
/**
 * @namespace Factories
 * @description Service zur Übermittlung der Bestellung an die Datenbank
 */
(function () {
    'use strict';

    angular
            .module('app')
            .factory('carthandler', carthandler)
            .value('items', []);


    carthandler.$inject = ['$http', 'items', '$rootScope', '$modal'];

    /**
     * 
     * @param {type} $http - HTTP-Service
     * @param {type} items - Array
     * @returns {carthandler.service_L6.carthandler.actions}
     */
    function carthandler($http, items, $rootScope, $modal) {

        var actions = {
            getItems: getItems,
            getItemByID: getItemByID,
            getLength: getLength,
            getArticleCount : getArticleCount,
            addArticle: addArticle,
            deleteArticles: deleteArticles,
            sum: sum,
            insertOrderIntoDatabase : insertOrderIntoDatabase
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
        
        function getArticleCount()
        {
            var count = 0;
            
            for(var Index = 0; Index < items.length; ++ Index)
            {
                count += items[Index].quantity;
            }
            
            return count;
        };

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
        
        function insertOrderIntoDatabase()
        {   
            
            if($rootScope.userSession !== null){
                
                var data = JSON.stringify(getItems());
                
                $http.post('/orderFood', data)
                    .success(successHandler())
                    .error(errorHandler());
            }else{
             
                $rootScope.registerPopup = $modal.open({
                    
                   templateUrl : '/static/app/register/registerpopup.view.html',
                   controller : 'RegisterController',
                   controllerAs : 'vm',
               //    bindToController : true
                    
                });
                
            }
            
            /////////////////////////////////////
                    
            function successHandler(){
                console.log("POST successful");
                items.length = 0;
            }; 
           
            function errorHandler(){
                console.log("Error"); 
            };
            
        };
    };
})();
