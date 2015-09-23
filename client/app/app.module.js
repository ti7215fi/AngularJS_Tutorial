/**
 * @namespace Module
 * @description Main module of the app.
 */
(function () {

    'use strict';

    angular
            .module('app', [
                'ngAnimate',
                //               'ngMock',
                'ngResource',
                'ui.bootstrap',
                'app.core',
                'app.start',
                'app.login',
                'app.register',
                'app.user',
                'app.about'
            ])
            .run(runApp);

    runApp.$inject = ['$resource', '$rootScope', '$state'];

    function runApp($resource, $rootScope, $state) {

        $resource('/getUserData').get(
                //////////////////////
                function (success) {
                    $state.go('home');

                    if (typeof success === "string") {

                        $rootScope.userSession = null;
                    } else {
                        $rootScope.userSession = success;
                    }
                },
                function (error) {
                    console.log(error);
                });
    }


})();


