(function () {

    'use strict';

    angular
            .module('app.core')
            .factory('userResource', userResource);

    userResource.$inject = ['$resource'];

    function userResource($resource) {

        return $resource('/user/:Id', null,
                {
                    'update': {method: 'PUT'}
                });

    }

})();


