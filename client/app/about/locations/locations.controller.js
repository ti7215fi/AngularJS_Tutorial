/**
 * @namespace Controller
 * @description Stellt dem View die Daten der Orte zur Verfügung
 *
 */
(function(){
    
    'use strict';
    
    angular
            .module('app')
            .controller('LocationController', LocationController);
    
    LocationController.$inject = ['locationHandler'];
    
    function LocationController(locationHandler){
        
        var vm = this;
        vm.loc = locationHandler;
        activate();
       
        ////////////////////////////////////////////
        function activate(){

            return vm.loc.getLocations();
        };
        
    };
    
})();

