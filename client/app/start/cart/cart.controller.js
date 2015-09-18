/**
 * @namespace Controller
 * @description Handler für den Warenkorb
 */
(function () {

    'use strict';

    angular
            .module('app.start')
            .controller('CartController', CartController);

    CartController.$inject = ['carthandler'];

    /* @ngInject */
    function CartController(carthandler)
    {
        var vm = this;
        
        vm.cart = carthandler;
    };
})();


