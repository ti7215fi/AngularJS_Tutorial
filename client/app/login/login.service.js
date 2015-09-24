/*
 * @namespace Service
 * @description Organize and verify the data of the login.
 */
(function ()
{
    'use strict';

    angular
            .module("app.login")
            .factory("loginHandler", loginHandler);

    loginHandler.$inject = ['$rootScope', '$state', 'sessionResource'];

    function loginHandler($rootScope, $state, sessionResource)
    {

        var actions = {
            authentication: authentication,
            getUserInformation: getUserInformation,
            logout: logout
        };
        return actions;

        ////////////////

        function authentication(username, password) {

            var credentials = {username: username, password: password, delete : false};

            sessionResource.save(credentials).$promise.then(function(success) {
                console.log(success);
                getUserData();
            });
        }

        function getUserData() {

            $rootScope.userSession = sessionResource.get();

        }

        function getUserInformation() {

            return $rootScope.userSession;

        }
        
        function logout() {

            sessionResource.save({ 'delete' : true }).$promise.then(function () {
                $rootScope.userSession = null;
                $state.go('home');
            });

        }


    }

})();            