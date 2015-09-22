/**
 * @namespace Routes
 * @description Routes of the about module.
 */
(function(){
    
    'use strict';
    
    angular
            .module('app.about')
            .run(runAppAbout);

    runAppAbout.$inject = ['routerHelper'];

    /* @ngInject */
    function runAppAbout(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'aboutUs',
                config: {
                    templateUrl     : 'static/app/about/locations/locations.view.html',
                    url             : '#/about',
                    controller      : 'LocationController',
                    controllerAs    : 'vm'
                }
            }
        ];
    }
    
    
})();


