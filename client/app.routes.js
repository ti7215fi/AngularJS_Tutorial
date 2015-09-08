(function(){
    
    'use strict';
    
    angular
            .module('app')
            .run(runApp);
    
    runApp.$inject = ['routerHelper'];

    /* @ngInject */
    function runApp(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'start',
                config: {
                    templateUrl : 'cart/articles.html',
                    url         : '#/'
                }
            },
            {
                state: 'impressum',
                config : {
                    templateUrl : 'impressum.view.html',
                    url         : '#/impressum'
                }
            }
        ];
    }
    
    
})();

