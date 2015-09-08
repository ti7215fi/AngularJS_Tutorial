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
                state: 'about',
                config: {
                    templateUrl: 'locations/locations.view.html',
                    url: '#/about'
                }
            }
        ];
    }
    
    
})();


