(function () {
    'use strict';

    angular
            .module('tutorialApp')
            .controller('UserController', UserController);

    function UserController($scope, User)
    {
        $scope.user = User;
    }
})();