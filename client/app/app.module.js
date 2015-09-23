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

    runApp.$inject = ['sessionResource', '$rootScope', '$state'];

    function runApp(sessionResource, $rootScope, $state) {

        sessionResource.getSessionData().$promise.then(function (success) {
            $state.go('home');
            $rootScope.userSession = null;
           
        });

    }


})();


