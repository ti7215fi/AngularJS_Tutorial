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
                    ////////////////////////////
                            function (success) {
                                console.log(success);
                                getUserData();
                            },
                            function (error) {
                                console.log(error);
                            });
                }

        function getUserData() {

            $resource('/getUserData').get(
                    //////////////////////
                            function (success) {
                                $rootScope.userSession = success;
                            },
                            function (error) {
                                console.log(error);
                            }
                    );
                }

        function getUserInformation() {

            return $rootScope.userSession;

        }

        function logout() {

            $resource('/logout').get(
                    ////////////////////
                    function (success) {
                        $rootScope.userSession = null;
                        $state.go('home');
                        console.log(success);
                    },
                    function (error) {
                        console.log(error);
                    });
        }


    }

})();            