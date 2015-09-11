/*
 * @namespace Controller
 * @description Nimmt eingegebene Daten entgegen und reicht sie an den Service weiter
 */
(function(){
    
    'use strict';
    
    angular
            .module('app.login')
            .controller('LoginController', LoginController);
    
    LoginController.$inject = ['loginHandler', '$scope'];
    
    function LoginController(loginHandler, $scope){
        
        var vm               = this;
        vm.login             = loginHandler;
        vm.refresh           = refreshLoginModels;
        
        ///////////////////////////////////////////
        
        function refreshLoginModels(){
          
            $scope.username = '';
            $scope.password = '';
            
        };
        
    };
    
})();