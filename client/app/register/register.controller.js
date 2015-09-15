(function(){
    
    'use strict';
    
    angular 
            .module('app.register')
            .controller('RegisterController', RegisterController);
    
    RegisterController.$inject = ['registerhandler'];
    
    function RegisterController(registerhandler){
      
        var vm = this;
        vm.register = registerhandler;
        vm.registerModel = {};
        
    };
    
})();