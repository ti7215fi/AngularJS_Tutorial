/**
 * 
 * @namespace Controller
 */
(function() {
    
    'use strict';
    
    angular
        .module('tutorialApp')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['adminHandler'];
    
    function AdminController(adminHandler){
        
        var vm = this;
        
        vm.admin = adminHandler;
    };
    
})();



