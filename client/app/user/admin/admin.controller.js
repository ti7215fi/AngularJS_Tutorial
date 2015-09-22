/**
 * @namespace Controller
 * @description Control the data of the admin area.
 */
(function() {
    
    'use strict';
    
    angular
        .module('app.user.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['adminHandler'];
    
    function AdminController(adminHandler){
        
        var vm = this;
        
        vm.admin = adminHandler;
    }
    
})();



