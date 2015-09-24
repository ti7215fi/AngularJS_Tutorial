(function () {

    'use strict';

    angular
            .module('app.core')
            .factory('pizzaResource', pizzaResource);

    pizzaResource.$inject = ['$resource'];

    function pizzaResource($resource) {

        return $resource('/pizza/:Id', null,
                {
                    update: {
                        method: 'PUT'
                    }
                });
    }

})();