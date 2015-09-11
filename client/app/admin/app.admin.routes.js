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
                state: 'addPizza',
                config: {
                    templateUrl : 'static/app/admin/addpizza.view.html' ,
                    url         : '#/addPizza',
                    controller  : 'AdminController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'addLocation',
                config: {
                    templateUrl : 'static/app/admin/addlocation.view.html',
                    url         : '#/addLocation',
                    controller  : 'AdminController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'getOrders',
                config: {
                    templateUrl : 'static/app/admin/getorders.view.html',
                    url         : '#/getOrders',
                    controller  : 'AdminController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
    
    
})();