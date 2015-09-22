/**
 * @namespace Routes
 * @description Routes of the customer module.
 */
(function(){
   
    'use strict';
    
    angular
            .module('app.user.customer')
            .run(appAdminRun);
    
    appAdminRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appAdminRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'customerSettings',
                config: {
                    templateUrl : 'static/app/user/customer/customersettings.view.html' ,
                    url         : '#/customerSettings',
                    controller  : 'CustomerController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'customerOrderOverview',
                config: {
                    templateUrl : 'static/app/user/customer/customerorder.view.html' ,
                    url         : '#/customerOrderOverview',
                    controller  : 'CustomerController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
    
    
})();
