(function () {

    'use strict';

    angular
            .module('app.core')
            .value('resourceUser', null)
            .service('userResource', userResource);

    userResource.$inject = ['$resource', 'resourceUser'];

    function userResource($resource, resourceUser) {

        resourceUser = $resource('/user/:Id', null,
                {
                    'update': {method: 'PUT'}
                });

        var actions = {
            getUsers: getUsers,
            getUserById: getUserById,
            deleteUserById: deleteUserById,
            addUser: addUser,
            updateUser : updateUser
        };
        return actions;

        ///////////////////////////////////

        function getUsers() {
            return resourceUser.query();
        }

        function getUserById(Id) {
            return resourceUser.get({Id: Id});
        }

        function deleteUserById(Id) {
            return resourceUser.delete({Id: Id});
        }

        function addUser(user) {
            return resourceUser.save(user);
        }

        function updateUser(id, newUserData) {
            return resourceUser.update({Id : id}, newUserData);
        }

    }

})();


