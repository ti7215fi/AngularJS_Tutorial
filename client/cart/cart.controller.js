/**
 * @namespace Controller
 * @description Handler für den Warenkorb
 */
(function () {

    'use strict'

    angular
            .module('tutorialApp')
            .controller('CartController', CartController);

    CartController.$inject = ['carthandler'];

    /* @ngInject */
    function CartController(carthandler)
    {
        var vm = this;
        
        return vm.cart = carthandler;
    };
})();


