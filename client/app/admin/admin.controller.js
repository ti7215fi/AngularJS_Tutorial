/**
 * @namespace Controller
 * @description Nimmt die Daten aus dem View entgegen und gibt sie dem Service weiter.
 */
(function() {
    
    'use strict';
    
    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['adminHandler'];
    
    function AdminController(adminHandler){
        
        var vm = this;
        
        vm.admin = adminHandler;
    };
    
})();



