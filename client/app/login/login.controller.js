/*
 * @namespace Controller
 * @description Control the data of the login.
 */
(function(){
    
    'use strict';
    
    angular
            .module('app.login')
            .controller('LoginController', LoginController);
    
    LoginController.$inject = ['loginHandler'];
    
    function LoginController(loginHandler){
        
        var vm               = this;
        vm.login             = loginHandler;
        vm.refresh           = refreshLoginModels;
        
        ///////////////////////////////////////////
        
        function refreshLoginModels(){
          
            vm.username = '';
            vm.password = '';
            
        }
        
    }
    
})();