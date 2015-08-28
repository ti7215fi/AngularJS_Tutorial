(function() {
    
    'use strict';
    
    angular
        .module('tutorialApp')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['adminHandler', '$scope'];
    
    function AdminController(adminHandler, $scope){
        
        $scope.admin = adminHandler;
    };
    
})();



