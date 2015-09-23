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

    loginHandler.$inject = ['$rootScope', '$state', '$resource'];

    function loginHandler($rootScope, $state, $resource)
    {

        var actions = {
            authentication: authentication,
            getUserInformation: getUserInformation,
            logout: logout
        };
        return actions;

        ////////////////

        function authentication(username, password) {

            var credentials = {username: username, password: password};

            $resource('/login').save(credentials,
                    successHandler,
                    errorHandler);

            ///////////////////////////////////

            function successHandler(response) {
                console.log(response);
                getUserData();
            }

            function errorHandler(response) {
                console.log(response);
            }

        }


        function getUserData() {

            $resource('/getUserData').get(
                    successHandler,
                    errorHandler);

            /////////////////////////////

            function successHandler(response) {
                $rootScope.userSession = response;
            }

            function errorHandler(response) {
                console.log(response);
            }

        }

        function getUserInformation() {

            return $rootScope.userSession;

        }

        function logout() {

            $resource('/logout').get(
                    successHandler,
                    errorHandler);
                    
            //////////////////////////////////        

            function successHandler(response) {
                $rootScope.userSession = null;
                $state.go('home');
                console.log(response);
            }

            function errorHandler(response) {
                console.log(response);
            }

        }


    }

})();            