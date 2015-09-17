(function(){
    
    'use strict';
    
    angular
            .module('app.user.customer')
            .controller('CustomerController', CustomerController);
    
    CustomerController.$inject = ['customerAreaHandler'];
    
    function CustomerController(customerAreaHandler){
      
        var vm = this;
        vm.customerArea = customerAreaHandler;
        vm.customerModel = {};
        
    };
    
})();
