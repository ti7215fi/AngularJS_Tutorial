(function(){
   
    'use strict';
    
    angular
            .module('app.start')
            .run(runAppStart);
    
    runAppStart.$inject = ['routerHelper'];

    /* @ngInject */
    function runAppStart(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state   : 'home',
                config  : {
                    templateUrl : 'static/app/start/articles.html',
                    url         : '#/'
                }
            },
            {
                state   : 'ourImpressum',
                config  : {
                    templateUrl : 'static/app/impressum.view.html',
                    url         : '#/impressum'
                }
            }
        ];
    }
    
})();
