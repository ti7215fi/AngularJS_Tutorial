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
                state   : 'start',
                config  : {
                    templateUrl : 'static/app/start/articles.html',
                    url         : '#/'
                }
            },
            {
                state   : 'impressum',
                config  : {
                    templateUrl : 'static/app/impressum.view.html',
                    url         : '#/impressum'
                }
            }
        ];
    }
    
})();
