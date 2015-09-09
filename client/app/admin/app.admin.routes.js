(function(){
   
    'use strict';
    
    angular
            .module('app.admin')
            .run(appAdminRun);
    
    appAdminRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appAdminRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'admin',
                config: {
                    templateUrl : 'static/app/admin/admin.view.html' ,
                    url         : '#/admin',
                    controller  : 'AdminController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
    
    
})();