(function(){
    
    'use strict';
    
    angular
            .module('app.login')
            .run(runAppLogin);

    runAppLogin.$inject = ['routerHelper'];

    /* @ngInject */
    function runAppLogin(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'login',
                config: {
                    templateUrl     : 'static/app/login/login.view.html',
                    url             : '#/login',
                    controller      : 'LoginController',
                    controllerAs    : 'vm'
                }
            }
        ];
    }
    
})();
