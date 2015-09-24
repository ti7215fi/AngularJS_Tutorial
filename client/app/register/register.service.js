/**
 * @namespace Service
 * @description Organize and verify the data of the registration.
 */
(function () {

    'use strict';

    angular
            .module('app.register')
            .factory('registerhandler', registerhandler);

    registerhandler.$inject = ['$rootScope', 'userResource'];

    function registerhandler($rootScope, userResource) {

        var actions = {
            abort: abort,
            saveRegistration: saveRegistration
        };
        return actions;

        /////////////////////

        function abort() {

            $rootScope.registerPopup.close();

        }

        function saveRegistration(registerModel) {
            
            userResource.save(registerModel).$promise.then(function() {
                $rootScope.registerPopup.close();
                
            });
        }

    }

})();