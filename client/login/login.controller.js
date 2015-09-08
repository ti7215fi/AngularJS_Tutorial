/*
 * @namespace Controller
 * @description Nimmt eingegebene Daten entgegen und reicht sie an den Service weiter
 */
(function(){
    
    'use strict';
    
    angular
            .module('loginModule')
            .controller('LoginController', LoginController);
    
    LoginController.$inject = ['loginHandler'];
    
    function LoginController(loginHandler){
        
        var vm      = this;
        vm.login    = loginHandler;
        
        return vm.login;
    };
    
})();