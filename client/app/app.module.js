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
                'ui.bootstrap',
                'app.core',
                'app.start',
                'app.login',
                'app.register',
                'app.user',
                'app.about'
            ])
            .run(runApp);

    runApp.$inject = ['sessionResource', '$rootScope', '$state'];

    function runApp(sessionResource, $rootScope, $state) {

        sessionResource.get().$promise.then(function (success) {
            if (success.ID === 'undefined') {
                $rootScope.userSession = null;
            } else {
                $rootScope.userSession = success;
            }
            $state.go('home');

        });

    }


})();


