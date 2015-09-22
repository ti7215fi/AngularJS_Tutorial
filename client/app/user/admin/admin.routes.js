/**
 * @namespace Routes
 * @description Routes of the admin module.
 */
(function(){
   
    'use strict';
    
    angular
            .module('app.user.admin')
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
                    templateUrl : 'static/app/user/admin/views/addpizza.view.html' ,
                    url         : '#/addPizza',
                    controller  : 'AdminController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'addLocation',
                config: {
                    templateUrl : 'static/app/user/admin/views/addlocation.view.html',
                    url         : '#/addLocation',
                    controller  : 'AdminController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'getOrders',
                config: {
                    templateUrl : 'static/app/user/admin/views/getorders.view.html',
                    url         : '#/getOrders',
                    controller  : 'AdminController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'getCustomers',
                config: {
                    templateUrl : 'static/app/user/admin/views/customers.view.html',
                    url         : '#/getCustomers',
                    controller  : 'AdminController',
                    controllerAs: 'vm'
                }
            }            
        ];
    }
    
    
})();